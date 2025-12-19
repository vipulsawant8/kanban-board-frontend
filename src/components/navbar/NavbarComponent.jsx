import { Navbar, Container, Nav, NavbarBrand, NavbarToggle, NavbarCollapse, NavDropdown, DropdownItem } from "react-bootstrap"
import { useSelector } from "react-redux";
import { LogoutButton } from "@/components/auth";

const NavbarComponent = () => {

	const isAuthenticated  = useSelector(state => state.auth.isAuthenticated);

	if (!isAuthenticated) return;

  return (
	<Navbar bg="dark" variant="dark" expand="lg" className="mb-3 shadow-sm">
		<Container fluid>
			<NavbarBrand className="fw-semibold"> Live Poll </NavbarBrand>
			<Navbar.Toggle aria-controls="main-navbar" />
				<Navbar.Collapse id="main-navbar">
					<Nav  className="ms-lg-auto">
						<Nav.Item> <LogoutButton /> </Nav.Item>
						{/* <LogoutButton /> */}
					</Nav>
				</Navbar.Collapse>
		</Container>
	</Navbar>
  );
}

export default NavbarComponent;