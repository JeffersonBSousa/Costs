import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Logout from '../authentication/Logout';
import Container from './Container';
import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png';

function Navbar() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/projects">Projetos</Link>
          </li>
          <li className={styles.item}>
            <Link to="/company">Empresa</Link>
          </li>
          <li className={styles.item}>
            <Link to="/contact">Contato</Link>
          </li>
          {userEmail ? (
            <>
              <li className={styles.email}>
                <span>{userEmail}</span>
              </li>
              <li className={styles.item}>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link to="/login">Login</Link>
              </li>
              <li className={styles.item}>
                <Link to="/register">Cadastre-se</Link>
              </li>
            </>
          )}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
