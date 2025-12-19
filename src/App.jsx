import { RouterProvider } from "react-router-dom";
import router from "@/router/router.jsx";
import { AuthInitializer } from "@/components/auth";
import '@/App.css'
import { useEffect } from "react";
import { setLogoutHandler } from "@/app/logoutHandler";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/app/features/auth/authSlice";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
	
	const dispatch = useDispatch();

	useEffect(() => {
		setLogoutHandler(() => {
			dispatch(clearAuth());
		});
	}, [dispatch]);

	return ( <>
		<AuthInitializer />
		<RouterProvider router={router} />
		<ToastContainer autoClose={2500} position='top-right' />
	</> );
};

export default App;