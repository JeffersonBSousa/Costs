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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/projects");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.newproject_container}>
      <h1>Registrar</h1>
      {error && <p className={styles.error}>{error}</p>}
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
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Register;
