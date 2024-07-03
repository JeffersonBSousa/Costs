// Register.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Register.module.css";
import Input from "../form/Input";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Conta criada com sucesso!"); // Definir mensagem de sucesso
      setError(""); // Limpar mensagem de erro, se houver
      setTimeout(() => {
        navigate("/projects");
      }, 2000); // Navegar após 2 segundos
    } catch (error) {
      setError(error.message);
      setSuccess(""); // Limpar mensagem de sucesso, se houver
    }
  };

  return (
    <div className={styles.newproject_container}>
      <h1>Cadastre-se</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}{" "}
      {/* Exibir mensagem de sucesso */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <Input
            type="email"
            text="E-mail"
            name="email"
            placeholder="Insira seu e-mail"
            value={email}
            handleOnChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            text="Senha"
            name="password"
            placeholder="Insira sua senha"
            value={password}
            handleOnChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            text="Confirmar Senha"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            handleOnChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.btn} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Register;
