import { Link } from "react-router-dom";
import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function ProjectCard({ id, name, budget, category, handleRemover }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemover(id);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name || "Nome não disponível"}</h4>
      <p> 
        <span>Orçamento:</span> R${budget || "Não definido"}
      </p>
      <p className={styles.category_text}>
        <span className={`${category && category.name ? styles[category.name.toLowerCase()] : ''}`}></span> 
        {category && category.name ? category.name : "Categoria não definida"}
      </p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil /> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
