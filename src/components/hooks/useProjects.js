import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const user = auth.currentUser;

      if (!user) {
        setError('Usuário não autenticado');
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'projects'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(userProjects);
      } catch (error) {
        console.error('Error fetching projects: ', error);
        setError('Erro ao buscar projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const removeProject = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects(projects.filter((project) => project.id !== id));
      setMessage('Projeto removido com sucesso!');
    } catch (error) {
      console.error('Error removing project: ', error);
      setError('Erro ao remover projeto');
    }
  };

  return {
    projects,
    loading,
    error,
    message,
    removeProject,
  };
};

export default useProjects;
