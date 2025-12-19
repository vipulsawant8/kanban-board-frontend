import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Container, Row, CardHeader, CardFooter } from "react-bootstrap";

import { registerUser, loginUser } from "@/app/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useRef } from "react";
import notify from "../../utils/notify";

const RegisterPage = () => {

	const formRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, isAuthenticated } = useSelector((state) => state.auth);

	const handleRegister = async (data) => {
			try {
				await dispatch(registerUser(data));
	
				notify.success("Registered successfully now logging you in");
	
				const payload = { identity: data.email, password: data.password };
	
				await dispatch(loginUser(payload)).unwrap();

				notify.success("Logged-in Successfully");
	
				formRef.current.resetForm();
			} catch (error) {
				
				const msg = error || "Registration Failed";
				notify.error(msg);
			}
	};

	const handleError = (errors) => {
		console.log("Register Form errors :", errors);
	};

	useEffect(() => {

		if (isAuthenticated) {

			navigate('/board', { replace: true });
		}
	}, [isAuthenticated]);

	return ( <Container className="py-4">
		<Row className="justify-content-center">
			<Col xs={12} sm={10} md={6} lg={4}>
				<Card className="p-3" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", borderRadius: "8px"  }}>
					<CardBody>
						<CardTitle className="text-center h1"> <h1> Register Page </h1> </CardTitle>
						<RegisterForm 
							ref={formRef}
							onSubmit={handleRegister}
							loading={loading}
							onError={handleError} />
						<div className="mt-4"> Already user? click <Link to={'/login'}> here </Link> to login.</div>
					</CardBody>
				</Card>
			</Col>
		</Row>
	</Container> );
};

export default RegisterPage;