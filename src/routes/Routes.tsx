import RouteGuard from './RouteGuard';
import { Route, Routes } from 'react-router-dom';
import { UserRolesEnum } from '../enums/UserRolesEnum';

import { HomePage, AboutPage, AuthPage, NotFoundPage, AdminPage, CutMapPage, DimensionsPage, UnauthorizedPage, DimensionDetailPage, DimensionsHistoryPage, CheckoutPage, UnitProjectsPage } from '../pages';

const routes = (
    <Routes>
        {/* Public Routes */}
        <Route
            path="/*"
            element={<NotFoundPage />}
        />
        <Route
            path="/about"
            element={<AboutPage />}
        />
        <Route
            path="/unauthorized"
            element={<UnauthorizedPage />}
        />
        <Route
            path="/auth/:token/:optionalParam?"
            element={<AuthPage />}
        />
        {/* Protected Routes */}
        <Route
            path="/admin"
            element={
                <RouteGuard
                    element={<AdminPage />}
                    allowedRoles={[UserRolesEnum.ADMIN]}
                />
            }
        />
        <Route
            path="/"
            element={
                <RouteGuard
                    element={<HomePage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
        /*dimensions*/
        <Route
            path="/dimensions"
            element={
                <RouteGuard
                    element={<DimensionsPage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
        <Route
            path="/dimensions-history"
            element={
                <RouteGuard
                    element={<DimensionsHistoryPage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
        <Route
            path="/dimension/:dimensionID"
            element={
                <RouteGuard
                    element={<DimensionDetailPage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
        <Route
            path="/dimension/cut-map/:dimensionID"
            element={
                <RouteGuard
                    element={<CutMapPage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
        /*checkout*/
        <Route
            path="/checkout"
            element={
                <RouteGuard
                    element={<CheckoutPage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
        /*unit project */
        <Route
            path="/unit-projects"
            element={
                <RouteGuard
                    element={<UnitProjectsPage />}
                    allowedRoles={[UserRolesEnum.ADMIN, UserRolesEnum.USER]}
                />
            }
        />
    </Routes>
);

export default routes;
