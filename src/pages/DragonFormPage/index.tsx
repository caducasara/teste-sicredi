import "./styles.css";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import stringToArray from "../../utils/StringToArray";
import { DragonWithoutId } from "../../@types/DragonsInterface";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function DragonFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dragon, setDragon] = useState<DragonWithoutId>({
    name: "",
    type: "",
    imageUrl: "",
    histories: [""],
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDragon(){
      try{
        const response = await api.get(`${id}`);

        if(!Array.isArray(response.data.histories)){
          response.data.histories = stringToArray(response.data.histories, ',')
        }

        setDragon(response.data)
      }catch(error){
        setError("Erro ao carregar dragão")
      }finally{
        setLoading(false)
      }
    }

    if(id) {
      setLoading(true);
      fetchDragon();
    }
  }, [id]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setDragon((prev) => ({ ...prev, [name]: value }));
  }

  function handleHistoryChange(index: number, value: string) {
    const newHistories = [...dragon.histories];
    newHistories[index] = value;

    setDragon((prev) => ({ ...prev, histories: newHistories }));
  }

  function addHistory() {
    setDragon((prev) => ({ ...prev, histories: [...prev.histories, ""] }));
  }

  function removeHistory(index: number) {
    if (dragon.histories.length === 1) return;

    const newHistories = [...dragon.histories];
    newHistories.splice(index, 1);

    setDragon((prev) => ({ ...prev, histories: newHistories }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if(id) {
        await api.put(`${id}`, dragon);
      } else {
        await api.post("", dragon);
      }

      navigate("/");
    } catch (err) {
      setError("Erro ao salvar dragão.");
    } finally {
      setSaving(false);
    }
  }

  if(loading) return <p>Carregando dados...</p>;

  return (
    <div className="dragon-form-page">
      <h1>{id ? "Editar Dragão" : "Criar Dragão"}</h1>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Nome:"
          type="text"
          name="name"
          value={dragon.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Tipo:"
          type="text"
          name="type"
          value={dragon.type}
          onChange={handleChange}
          required
        />

        <Input
          label="URL da imagem:"
          type="url"
          name="imageUrl"
          value={dragon.imageUrl}
          onChange={handleChange}
          alt={dragon.name}
          required
        />

        <fieldset>
          <legend>Histórias</legend>
          {dragon.histories.map((history, idx) => (
            <div key={idx} className="history-item">
              <Input
                type="text"
                value={history}
                onChange={(e) => handleHistoryChange(idx, e.target.value)}
                required
              />
              {dragon.histories.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeHistory(idx)}
                  aria-label="Remover história"
                  variant="danger"
                >
                  &times;
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addHistory} variant="secondary">
            + Adicionar história
          </Button>
        </fieldset>

        <div className="actions">
          <Button type="submit" disabled={saving} variant="primary">
            {saving ? "Salvando..." : "Salvar"}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            variant="danger"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}