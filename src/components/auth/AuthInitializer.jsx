import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMe } from "@/app/features/auth/authSlice.js";

const AuthInitializer = () => {

	const dispatch = useDispatch();

	useEffect(() => {

		console.log("Auth Initiated");
		// const init = async () => {
			
		// 	await dispatch(getMe());
		// };
		// init();
		dispatch(getMe());
	}, []);

	return null;
};

export default AuthInitializer;