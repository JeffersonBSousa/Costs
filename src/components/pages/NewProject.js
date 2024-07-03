import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  async function createPost(project) {
    const user = auth.currentUser; // Obter o usuário autenticado

    if (!user) {
      console.error("Usuário não autenticado");
      return;
    } 

    project.cost = 0;
    project.services = [];
    project.userId = user.uid; // Adicionar o ID do usuário ao projeto

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
