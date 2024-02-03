import React from 'react';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { ToastProvider } from './components/uiComp/Toast/ToastProvider.tsx';
import { ConfirmModalProvider } from './components/uiComp/modals/ConfirmModalProvider.tsx';

import './assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <ToastProvider>
                <ConfirmModalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ConfirmModalProvider>
            </ToastProvider>
        </AuthProvider>
    </React.StrictMode>
);
