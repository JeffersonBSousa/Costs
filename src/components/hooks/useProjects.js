// src/hooks/useProjects.js

import { useState, useEffect } from 'react';
import { db } from '../../firebase';  
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'projects'));
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProjects(projectsData);
            } catch (error) {
                setError('Error fetching projects: ' + error.message);
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
            setMessage(`Projeto removido com sucesso`);
        } catch (error) {
            setError('Error removing project: ' + error.message);
        }
    };

    return { projects, loading, error, message, removeProject };
};

export default useProjects;
