// src/migrate.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const path = require('path');
const fs = require('fs');

// Ler e parsear o arquivo db.json
const dataPath = path.resolve(__dirname, '../db.json');
let data;

try {
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  data = JSON.parse(fileContent);
} catch (error) {
  console.error('Erro ao ler ou parsear db.json:', error);
  process.exit(1);
}

// Verificar se a estrutura do arquivo está correta
if (!data.projects || !data.categories) {
  console.error('O conteúdo de db.json não possui as chaves esperadas: projects e categories');
  process.exit(1);
}

const firebaseConfig = {
  apiKey: "AIzaSyAegBGaurEvqABERDoniP7R-DQ0IgCZpUg",
  authDomain: "costs-815c5.firebaseapp.com",
  projectId: "costs-815c5",
  storageBucket: "costs-815c5.appspot.com",
  messagingSenderId: "716255631464",
  appId: "1:716255631464:web:fec4a92238793fc1d243dd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const migrateData = async () => {
  const projectsCollectionRef = collection(db, 'projects');
  const categoriesCollectionRef = collection(db, 'categories');

  for (const project of data.projects) {
    await addDoc(projectsCollectionRef, project);
  }

  for (const category of data.categories) {
    await addDoc(categoriesCollectionRef, category);
  }

  console.log('Migration completed');
};

migrateData().catch(console.error);
