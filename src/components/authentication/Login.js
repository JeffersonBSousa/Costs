import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Input from "../form/Input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/projects");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className={styles.newproject_container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          type="email"
          value={email}
          text="E-mail"
          name="email"
          handleOnChange={(e) => setEmail(e.target.value)}
          placeholder="Insira seu e-mail"
          required
        />
        <Input
          type="password"
          text="Senha"
          name="password"
          value={password}
          handleOnChange={(e) => setPassword(e.target.value)}
          placeholder="Insira sua senha"
          required
        />
        <button className={styles.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
