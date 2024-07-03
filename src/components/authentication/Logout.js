import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import styles from './Logout.module.css';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <button className={styles.logout_button} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
