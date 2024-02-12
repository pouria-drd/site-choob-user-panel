import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRolesEnum } from '../enums/UserRolesEnum';
import { ToastStatusEnum, useToast } from '../components/uiComp/Toast/ToastProvider';

import AuthService from '../services/AuthService';
import SpinnerCard from '../components/uiComp/cards/SpinnerCard';
import AuthErrorCard from '../components/uiComp/cards/AuthErrorCard';

interface TokenValidationResult {
    token: string;
    email: string;
}

interface BearerResult {
    data: {
        token: string;
        user: any;
    };
}

function AuthPage() {
    const navigate = useNavigate();
    const authService = new AuthService();

    const params = useParams<{ token?: string; optionalParam?: string }>();
    const { token, optionalParam } = Object.assign({}, params) as UrlParams;

    const [loading, setLoading] = useState(true);

    const { login, logout } = useAuth();

    const { showToast } = useToast();

    const handleLogin = (role: UserRolesEnum) => {
        login(role);
    };

    const handleLogout = () => {
        logout();
    };

    async function handleTokenValidation() {
        try {
            handleLogout();
            if (token) {
                const result = await authService.ValidateToken<TokenValidationResult>(token);
                // Store the token and optionalParam in sessionStorage
                sessionStorage.setItem('token', JSON.stringify(result));
                const bearerResult = await authService.RequestBearer<BearerResult>();

                sessionStorage.setItem('bearer', bearerResult.data.token);
                sessionStorage.setItem('user', JSON.stringify(bearerResult.data.user));

                let navOptParam = null;
                // TODO: redirect to optional param related page
                if (optionalParam) {
                    navOptParam = optionalParam;
                    sessionStorage.setItem('opt', optionalParam);
                }

                handleLogin(UserRolesEnum.USER);

                showToast('خوش آمدید', ToastStatusEnum.Success);

                // Redirect to the home page
                if (navOptParam) {
                    if (navOptParam === 'checkout') {
                        navigateTo('/checkout');
                    } else if (navOptParam === 'dimensions') {
                        navigateTo('/dimensions');
                    } else {
                        navigateTo('/');
                    }
                } else {
                    navigateTo('/');
                }
            }
        } catch (error) {
            handleLogout();
            setLoading(false);
            // Handle the error, e.g., display an error message
            console.error('Token validation error:', error);
        }
    }

    const navigateTo = (path: string) => {
        setTimeout(() => {
            navigate(path);
        }, 100);
    };

    useEffect(() => {
        handleTokenValidation();
    }, [token, authService, navigate]);

    return <div className="flex items-center justify-center h-full">{loading ? <SpinnerCard text={'درحال اعتبار سنجی'} /> : <AuthErrorCard />}</div>;
}

export default AuthPage;
