import { RouterProvider } from "react-router-dom";
import router from "@/router/router.jsx";
import { AuthInitializer } from "@/components/auth";
import '@/App.css'
import { useEffect } from "react";
import { setLogoutHandler } from "@/app/logoutHandler";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/app/features/auth/authSlice";

function App() {
	
	const dispatch = useDispatch();

	useEffect(() => {
		setLogoutHandler(() => {
			dispatch(logoutUser());
		});
	}, [dispatch]);

	return ( <>
		<AuthInitializer />
		<RouterProvider router={router} />
	</> );
};

export default App;