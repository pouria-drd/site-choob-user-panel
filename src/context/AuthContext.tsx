import { UserRolesEnum } from "../enums/UserRolesEnum";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userRole: UserRolesEnum;
  login: (role: UserRolesEnum) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const defaultUserRole: UserRolesEnum = UserRolesEnum.GUEST;
const USER_ROLE_KEY = "userRole";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userRole, setUserRole] = useState<UserRolesEnum>(() => {
    const storedRole = localStorage.getItem(USER_ROLE_KEY);
    return storedRole ? (storedRole as UserRolesEnum) : defaultUserRole;
  });

  useEffect(() => {
    // Store user role in localStorage after each state update
    localStorage.setItem(USER_ROLE_KEY, userRole);
  }, [userRole]);

  const login = (role: UserRolesEnum) => {
    // Set user role asynchronously
    setTimeout(() => {
      setUserRole(role);
    }, 0);
  };

  const logout = () => {
    // Clear localStorage and set user role asynchronously
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setUserRole(defaultUserRole);
    }, 0);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
