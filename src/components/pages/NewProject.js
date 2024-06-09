import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  async function createPost(project) {
    project.cost = 0;
    project.services = [];

    try {
      const docRef = await addDoc(collection(db, "projects"), project);
      console.log("Project added with ID: ", docRef.id);

      const state = { message: "Projeto criado com sucesso!" };
      navigate("/projects", { state });
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
