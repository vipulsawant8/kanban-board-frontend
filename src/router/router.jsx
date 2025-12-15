import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppLayout from "@/layout/AppLayout.jsx";
import AuthLayout from "@/layout/AuthLayout";

import NavbarComponent from "@/components/navbar/NavbarComponent.jsx";

import PageLoader from "@/components/common/PageLoader.jsx";

const LoginPage = lazy(() => import('@/pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage.jsx'));

const BoardPage = lazy(() => import('@/pages/board/BoardPage.jsx'));

import NotFound from "@/pages/NotFound.jsx";

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <Navigate to={'/login'} replace />
			},
			{
				element:<> <NavbarComponent /> <AppLayout /> </>,
				children: [
					{
						path: "login",
						element: <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>
					},
					{
						path: "register",
						element: <Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>
					}
				]
			},
			{
				element: <> <NavbarComponent /> <AuthLayout /> </>,
				children: [
					{
						path: 'board',
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