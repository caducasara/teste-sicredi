import { Link } from "react-router-dom";
import "./styles.css"
import { Dragon } from "../../@types/DragonsInterface";


interface ItensListProps {
    dragon: Dragon
}

export default function ItensList({ dragon }: ItensListProps) {
  return (
    <li className="card">
      <Link to={`/dragon/${dragon.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={dragon.imageUrl} alt={`Imagem do dragão ${dragon.name}`} />
        <h2>{dragon.name}</h2>
        <p>Tipo: {dragon.type}</p>
      </Link>
    </li>
  );
}