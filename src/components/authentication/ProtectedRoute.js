import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

function ProtectedRoute({ children }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>; // Exibe uma mensagem de carregamento enquanto verifica o estado de autenticação
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Exibe uma mensagem de erro se houver um problema na verificação
  }

  if (!user) {
    return <Navigate to="/login" />; // Redireciona para a página de login se o usuário não estiver autenticado
  }

  return children; // Renderiza o conteúdo protegido se o usuário estiver autenticado
}

export default ProtectedRoute;
