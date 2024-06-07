// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched categories: ", categoriesList); // Adicionando log para depuração
        setCategories(categoriesList);
      } catch (error) {
        console.error("Erro ao buscar categorias: ", error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};

export default useCategories;
