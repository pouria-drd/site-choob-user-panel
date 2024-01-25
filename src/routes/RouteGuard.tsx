import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRolesEnum } from "../enums/UserRolesEnum";

interface RouteGuardProps {
    element: React.ReactNode;
    allowedRoles?: UserRolesEnum[];
}

/**
 * RouteGuard Component for role-based and authenticated routing.
 *
 * @param {React.ReactNode} element - The element to be rendered if authorized.
 * @param {UserRolesEnum[]} allowedRoles - An array of allowed roles (optional).
 * 
 * @returns {React.ReactNode} - Rendered element or redirection to unauthorized page.
 */
const RouteGuard = ({ element, allowedRoles }: RouteGuardProps) => {
    const { userRole } = useAuth();

    // Redirect or show an unauthorized message based on authentication and roles
    return !userRole || (allowedRoles && !allowedRoles.includes(userRole)) ? (
        <Navigate to="/unauthorized" />
    ) : (
        <>{element}</>
    );
};

export default RouteGuard;
