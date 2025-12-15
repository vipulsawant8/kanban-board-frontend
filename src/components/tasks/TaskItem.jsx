import { useState, useRef } from "react";
import { Card, CardBody, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/app/features/tasks/taskSlice.js";

import { TaskEditForm } from "@/components/tasks";

const TaskItem = ({ task }) => {

	const formRef = useRef();

	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);

	const handleSave = async (data) => {

		try {
			const result = await dispatch(updateTask({ id: task._id, ...data })).unwrap();

			formRef.current.resetForm();
			setEditing(false);
		} catch (error) {
		
			window.alert(error || "Update failed. Please try again.");
		}
	};

	const handleDelete = async () => {

		if (!confirm("Delete this task?")) return;

			try {
				await dispatch(deleteTask(task._id)).unwrap();
			} catch (error) {
				
				window.alert(error || "Delete failed. Please try again.");
			}
	};

	return (
		<Card className="mb-2 kanban-task">
			<CardBody className="p-2">

				{ !editing && (<> <div className="d-flex justify-content-between">
					<strong className="fw-medium"> {task.title} </strong>
					<div>
						<Button size="sm" variant="outline-primary" onClick={() => setEditing(true)}> Edit </Button>
						<Button size="sm" variant="outline-danger" className="ms-2" onClick={handleDelete}> X </Button>
					</div>
				</div> 
				{ task.description && (<div className="text-muted small mt-1"> { task.description } </div>) }
				</>) }
				
				{ editing && (<><TaskEditForm task={task} onSubmit={handleSave} ref={formRef} /> <Button size="sm" variant="outline-danger" className="mt-2" onClick={() => setEditing(false)}> Cancel </Button> </>) }			
			</CardBody>
		</Card>
	);
}

export default TaskItem;