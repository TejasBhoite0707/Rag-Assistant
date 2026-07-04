import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated, selectLoading,selectInitialized } from "../features/auth/store/authSelectors";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectLoading);
     const isInitialized = useSelector(selectInitialized);
    if (!isInitialized) {

        return <Loader />;

    }

    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    return children;
};

export default ProtectedRoute;