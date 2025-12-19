import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button } from "react-bootstrap";
import { deleteTask } from "../../app/features/tasks/taskSlice.js";

const DeleteTaskModal = ({ show, onHide, task }) => {
	
	const dispatch = useDispatch();

	const handleDelete = async () => {
		try {
				await dispatch(deleteTask(task._id)).unwrap();
				onHide();
			} catch (error) {
				
				window.alert(error || "Delete failed. Please try again.");
			}	
	};

	return (
		<Modal show={show} backdrop="static" centered onHide={ onHide } keyboard={false} >
			<ModalHeader closeButton>
				<ModalTitle> Delete Task? </ModalTitle>
			</ModalHeader>
			<ModalFooter>
				<Button variant="outline-danger" style={{textDecoration: "none"}} onClick={handleDelete}> Confirm </Button>
			</ModalFooter>	
		</Modal>
	)
}

export default DeleteTaskModal