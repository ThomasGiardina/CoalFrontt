import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute  = ({ children }) => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    if (!isAuthenticated || role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute ;
