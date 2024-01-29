import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { StatusEnum } from '../enums/StatusEnum';
import { UserRolesEnum } from '../enums/UserRolesEnum';
import { useToast } from '../components/uiComp/toasts/ToastProvider';

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

                // TODO: redirect to optional param related page
                if (optionalParam) sessionStorage.setItem('opt', optionalParam);

                handleLogin(UserRolesEnum.USER);

                showToast('خوش آمدید', StatusEnum.Success);

                // Redirect to the home page
                navigate('/');
            }
        } catch (error) {
            handleLogout();
            setLoading(false);
            // Handle the error, e.g., display an error message
            console.error('Token validation error:', error);
        }
    }

    useEffect(() => {
        handleTokenValidation();
    }, [token, authService, navigate]);

    return <div className="flex items-center justify-center h-full">{loading ? <SpinnerCard text={'درحال اعتبار سنجی'} /> : <AuthErrorCard />}</div>;
}

export default AuthPage;
