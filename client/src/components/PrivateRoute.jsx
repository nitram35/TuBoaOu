import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


export default function PrivateRoute() {
    const { currentUser } = useSelector(state => state.user);

    // Outlet is a placeholder for child routes
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}
