import { useState } from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import useCategories from '../hooks/useCategories';

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {});
  const { categories, loading } = useCategories();

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleCategory = (e) => {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  };

  console.log("Categories in ProjectForm: ", categories); // Adicionando log para depuração

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        value={project.name || ''}
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
      />
      <Input
        value={project.budget || ''}
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
      />
      <Select
        value={project.category ? project.category.id : ''}
        options={categories}
        name="category_id"
        text="Selecione a categoria"
        handleOnChange={handleCategory}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
