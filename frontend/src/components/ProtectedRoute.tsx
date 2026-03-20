import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function ProtectedRoute({ children }: Props) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

interface Props {
    children: React.ReactNode;
}