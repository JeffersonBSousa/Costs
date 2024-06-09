import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("Fetching project...");
        const projectDoc = await getDoc(doc(db, "projects", id));
        if (projectDoc.exists()) {
          console.log("Project found:", projectDoc.data());
          const projectData = projectDoc.data();
          setProject(projectData);
          setServices(projectData.services || []);
        } else {
          console.log("Project not found");
          setMessage("Projeto não encontrado");
          setType("error");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setMessage("Erro ao buscar projeto");
        setType("error");
      }
    };
  
    fetchProject();
  }, [id]);
  

  const editPost = async (updatedProject) => {
    try {
      console.log("Editing project...");
      const totalCost = updatedProject.services.reduce(
        (acc, service) => acc + parseFloat(service.cost),
        0
      );

      updatedProject.cost = totalCost;

      if (updatedProject.budget < totalCost) {
        setMessage("O orçamento não pode ser menor que o custo do projeto");
        setType("error");
        return;
      }

      await updateDoc(doc(db, "projects", id), updatedProject);
      setProject(updatedProject);
      setMessage("Projeto atualizado com sucesso");
      setType("success");
    } catch (error) {
      setMessage("Erro ao atualizar projeto");
      setType("error");
    }
  };

  const createService = async (projectWithNewService) => {
    try {
      console.log("Creating service...");
      const lastService = projectWithNewService.services[projectWithNewService.services.length - 1];
      lastService.id = uuidv4(); // Define um novo ID para o serviço

      const lastServiceCost = parseFloat(lastService.cost);
      const newCost = parseFloat(projectWithNewService.cost || 0) + lastServiceCost;

      if (newCost > parseFloat(projectWithNewService.budget)) {
        setMessage("Orçamento ultrapassado, verifique o valor do serviço");
        setType("error");
        projectWithNewService.services.pop();
        return;
      }

      projectWithNewService.cost = newCost;

      await updateDoc(doc(db, "projects", id), projectWithNewService);
      setProject(projectWithNewService);
      setServices(projectWithNewService.services);
      setMessage("Serviço adicionado com sucesso");
      setType("success");
    } catch (error) {
      setMessage("Erro ao adicionar serviço");
      setType("error");
    }
  };

  const removeService = async (serviceId, serviceCost) => {
    try {
      console.log("Removing service...");
      const updatedServices = project.services.filter((service) => service.id !== serviceId);
      const updatedProject = { ...project, services: updatedServices, cost: project.cost - serviceCost };

      await updateDoc(doc(db, "projects", id), updatedProject);
      setProject(updatedProject);
      setServices(updatedServices);
      setMessage("Serviço removido com sucesso");
      setType("success");
    } catch (error) {
      setMessage("Erro ao remover serviço");
      setType("error");
    }
  };

  return {
    project,
    services,
    message,
    type,
    editPost,
    createService,
    removeService,
  };
};
