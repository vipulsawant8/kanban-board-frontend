import { Button } from "react-bootstrap";

const ListHeader = ({ title, onEdit, onDelete }) => {
	return (
		<div className="d-flex justify-content-between align-items-center mb-3">
			<strong> {title} </strong>
			<div>
				<Button variant="outline-primary" size="sm" className="me-2" onClick={onEdit}> Edit </Button>
				<Button variant="outline-danger" className="ms-2" size="sm" onClick={onDelete}> X </Button>
			</div>
		</div>
	);
};

export default ListHeader;