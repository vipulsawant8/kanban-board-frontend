import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Card, CardTitle, CardBody, Button } from "react-bootstrap";
import CustomForm from "@/components/form/CustomForm.jsx";
import { createList } from "@/app/features/lists/listSlice.js";

const AddList = ({ show, onHide, ref }) => {
	
	const dispatch = useDispatch();

	const fields = [
		{
			name: "title",
			label: "List title",
			type: "text",
			placeholder: "Enter list title"
		},
	];
	
	const listSchema = yup.object({
		title: yup.string().required(),
	});

	const handleAddList = async (data) => {
	
		try {
			const result = await dispatch(createList(data.title)).unwrap();
			console.log('result :', result);

			ref.current.resetForm();
			onHide();
		} catch (error) {
			console.log("error :", error);
			window.alert(error || "Add List failed. Please try again.");
		}
	};

	const handleError = errors => {

		console.log("errors :", errors);
	};

	return (<Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
		<ModalHeader closeButton>
			<ModalTitle>Confirm Action</ModalTitle>
		</ModalHeader>

		<ModalBody style={{ backgroundColor: "#f8f9fa" }}>
			<Card className="mt-4 p-3" style={{ backgroundColor: "none", border: "none" }}>
				<CardTitle className="mb-3 text-center">
						Add New List
					</CardTitle>
				<CardBody>
					<CustomForm ref={ref} fields={fields} validationSchema={listSchema} onSubmit={handleAddList} onError={handleError} defaultValues={{ title: "" }} submitLabel="Add" name="AddList" />
				</CardBody>
			</Card>
		</ModalBody>
		
		<ModalFooter>
			<Button variant="secondary" onClick={onHide}>
			Cancel
			</Button>
		</ModalFooter>
	</Modal>)
}

export default AddList;