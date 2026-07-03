import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated, selectLoading } from "../features/auth/store/authSelectors";
import Loader from "../components/ui/Loader";

const PublicRoute = ({ children }) => {

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectLoading);

    if (isLoading) {
        return <Loader />;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;