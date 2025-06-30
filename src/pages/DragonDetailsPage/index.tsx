import "./styles.css"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import stringToArray from "../../utils/StringToArray";
import { Dragon } from "../../@types/DragonsInterface";
import Button from "../../components/Button";
import Header from "../../components/Header";


export default function DragonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [dragon, setDragon] = useState<Dragon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDragon() {
      try {
        const response = await api.get(`${id}`);

        if(!Array.isArray(response.data.histories)){
          response.data.histories = stringToArray(response.data.histories, ',')
        }

        setDragon(response.data);
      } catch (error) {
        console.error("Erro ao buscar dragão:", error);
      } finally {
        setLoading(false);
      }
    }

    if(id) fetchDragon();
  }, [id]);

  async function handleDelete() {
    if(!id) return;

    const confirmed = window.confirm("Tem certeza que deseja excluir este dragão?");
    if(!confirmed) return;

    try {
      await api.delete(`${id}`);

      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir dragão:", error);
      alert("Erro ao excluir dragão. Tente novamente.");
    }
  }

  if (loading) return <p>Carregando...</p>;
  if (!dragon) return <p>Dragão não encontrado.</p>;

  return (
    <div className="dragon-detail">
      <h1>{dragon.name}</h1>
      <img src={dragon.imageUrl} alt={`Imagem do dragão ${dragon.name}`} />
      <p><strong>Tipo:</strong> {dragon.type}</p>
      <p><strong>Criado em:</strong> {new Date(dragon.createdAt).toLocaleDateString()}</p>

      <h3>Histórias</h3>
      {dragon.histories.length > 0 ?
      <ul>
        {dragon.histories.map((history, idx) => (
          <li key={idx}>{history}</li>
        ))}
      </ul> : <p>Este Dragão ainda não contém histórias</p>}

      <div className="detail-actions">
        <Button onClick={() => navigate(`/dragon/edit/${dragon.id}`)} variant="primary">Editar</Button>
        <Button onClick={handleDelete} variant="danger">Excluir</Button>
      </div>
    </div>
  );
}