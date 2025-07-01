import "./styles.css"
import { useEffect, useState } from "react";
import api from "../../services/api";
import ItensList from "../../components/ItemsList";
import { Dragon } from "../../@types/DragonsInterface";


export default function DragonsListPage() {
  const [dragonsList, setDragonsList] = useState<Dragon[]>([] as Dragon[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('');

        const orderedList = response.data.sort((a: Dragon, b: Dragon) => {
          return a.name.localeCompare(b.name);
        });

        setDragonsList(orderedList);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {
        loading ? <p>Carregando dados...</p> :
        <div className="list-container">
          <h1 className="list-title">Listagem de Dragões</h1>
          <ul className="cards-list">
            {dragonsList.map((dragon: Dragon) => <ItensList key={dragon.id} dragon={dragon}/>)}
          </ul>
        </div>
      }
    </>
  );
}