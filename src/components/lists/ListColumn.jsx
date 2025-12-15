import { useState, useRef, memo } from "react";
import { Button, Card, CardBody } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { updateList, deleteList } from "@/app/features/lists/listSlice.js";

import { CustomForm } from "@/components/form";

// import ListHeader from "@/components/lists/ListHeader.jsx";
// import ListTasks from "@/components/lists/ListTasks.jsx";
// import ListAddTask from "@/components/lists/ListAddTask.jsx";

import { ListHeader, ListTasks, ListAddTask, ListEditForm } from '@/components/lists';

const ListColumn = ({ list, tasks = [] }) => {

	const listFormRef = useRef();
	
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);
	
	const handleSave = async (data) => {

		try {
			await dispatch(updateList({ id: list._id, title: data.title })).unwrap();
			listFormRef.current.resetForm();
			setEditing(false);
		} catch (error) {
			
			window.alert(error || "Update failed. Please try again.");
		}
	};

	const handleError = errors => {

		console.log("List Column Errors :", errors);
	};

	const handleDelete = async () => {

		if (!confirm("Delete this list?")) return;

			try {
				await dispatch(deleteList(list._id)).unwrap();
			} catch (error) {
				
				window.alert(error || "Delete failed. Please try again.");
			}
	};

	return (
		
		// <Card className="mb-4 shadow-sm kanban-list">
		<Card className="kanban-list">
			<CardBody className="kanban-list-header">
				{ !editing ? (	<ListHeader title={list.title} onEdit={() => setEditing(true)} onDelete={handleDelete} />	) : (<> <ListEditForm ref={listFormRef} list={list} onSubmit={handleSave} /> 
				<Button size="sm" variant="outline-danger" className="mt-2" onClick={() => setEditing(false)}>
					Cancel
				</Button>  </>) }

				<ListTasks listID={list._id} tasks={tasks} />
				<ListAddTask listID={list._id} />
			</CardBody>
		</Card>
	)
}

export default memo(ListColumn);