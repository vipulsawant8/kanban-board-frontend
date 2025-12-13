import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "@/layout/AppLayout.jsx";

// import LoginPage from "@/pages/auth/LoginPage.jsx";
// import RegisterPage from "@/pages/auth/RegisterPage.jsx";

import PageLoader from "@/components/common/PageLoader.jsx";

const LoginPage = lazy(() => import('@/pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage.jsx'));

// import BoardPage from "@/pages/board/BoardPage.jsx";
const BoardPage = lazy(() => import('@/pages/board/BoardPage.jsx'));

import { ProtectedRoutes } from "@/components/auth";

import NotFound from "@/pages/NotFound.jsx";

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				index: true,
				// element: <AuthInitializer />
				element: <Navigate to={'/login'} replace />
			},
			{
				path: "login",
				// element: <LoginPage />
				element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>
			},
			{
				path: "register",
				// element: <RegisterPage />
				element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>
			},
			{
				element: <ProtectedRoutes />,
				children: [
					{
						path: 'board',
						// element: <BoardPage />
						element: <Suspense fallback={<PageLoader />}><BoardPage /></Suspense>
					}
				]
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]);

export default router;