import * as yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllLists, fetchLists, createList, reorderList, persistReorderLists } from "@/app/features/lists/listSlice.js";
import { selectAllTasks, fetchTasks, reorderTaskLocal, persistReorderTasks } from "@/app/features/tasks/taskSlice.js";

import { CustomForm } from "@/components/form";

import { Container, Row, Col, Card, CardBody, CardTitle } from "react-bootstrap";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { ListColumn } from "@/components/lists";

import reorderArray from "@/utils/reorder.js";

import { useRef } from "react";

const BoardPage = () => {

	const formRef = useRef();

	const dispatch = useDispatch();

	const lists = useSelector(selectAllLists);
	const tasks = useSelector(selectAllTasks);
	
	const loading = useSelector(state => state.lists.loading);

	useEffect(() => {

		dispatch(fetchLists());
		dispatch(fetchTasks());
	}, []);

	const tasksByList = useMemo(() =>{

		const map = {};
		tasks.forEach(t => {
			if (!map[t.listID]) map[t.listID] = [];
			map[t.listID].push(t);
		});

		Object.keys(map).forEach(k => {
			map[k].sort((a, b) => a.position - b.position);
		});

		return map;
	}, [tasks]);

	const onDragEnd = useCallback((result) => {

		console.log('onDragEnd result :', result);
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		if (type === "LIST") {
			
			// if (source.index === destination.index) return;

			const newOrder = reorderArray(lists, source.index, destination.index);
			// console.log("newOrder onDrag :", newOrder);

			const payload = newOrder.map((l, idx) => ({ _id: l._id, position: idx }));

			dispatch(reorderList(payload));
			dispatch(persistReorderLists(payload));
			return
		}

		if (type === "TASK") {
			
			const srcListID = source.droppableId;
			const destListID = destination.droppableId;

			const sourceTasks = tasksByList[srcListID] ? [...tasksByList[srcListID]] : [];
			const destTasks =  srcListID === destListID ? sourceTasks : ( tasksByList[destListID] ? [...tasksByList[destListID]] : []);
			
			if (srcListID === destListID) {
				
				const newOrder = reorderArray(sourceTasks, source.index, destination.index);

				// console.log("new order tasks same list :", newOrder);
				const updates = newOrder.map((t, idx) => ({ _id: t._id, listID: srcListID, position: idx}));

				dispatch(reorderTaskLocal(updates));

				dispatch(persistReorderTasks(updates));
			
				return;
			}
			const [moved] = sourceTasks.splice(source.index, 1);

			destTasks.splice(destination.index, 0, moved);

			const updates = [
				...sourceTasks.map((t, idx) => ({ _id: t._id, listID: srcListID, position: idx })),
				...destTasks.map((t, idx) => ({ _id: t._id, listID: destListID, position: idx }))
			];

			dispatch(reorderTaskLocal(updates));

			dispatch(persistReorderTasks(updates));
			return;
		}
	}, [lists, tasksByList, dispatch]);

	const fields = [
		{
			name: "title",
			label: "List title",
			type: "text",
			placeholder: "Enter list title"
		},
	];

	const listSchema = yup.object({
		title: yup.string().required("Title is required"),
	});

	const handleAddList = async (data) => {

		try {
			const result = await dispatch(createList(data.title)).unwrap();
			console.log('result :', result);

			formRef.current.resetForm();
		} catch (error) {
			console.log("error :", error);
			window.alert(error || "Add List failed. Please try again.");
		}
	};

	const handleError = errors => {

		console.log("errors :", errors);
	};
	
	return (
		<Container className="p-4">
			

			<Container className="py-4">
			<Row className="justify-content-start">
				<Col xs={12} sm={10} md={8} lg={6}>
				<Card className="mt-4 p-3">
					<CardTitle className="mb-3">
							Add New List
						</CardTitle>
					<CardBody>
						<CustomForm ref={formRef} fields={fields} onSubmit={handleAddList} onError={handleError} defaultValues={{ title: "" }} submitLabel="Add" name="AddList" />
					</CardBody>
				</Card>
				</Col>
			</Row>
			</Container>
			<h2 className="mb-4"> Your Board </h2>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId="board-droppable"
					direction="horizontal"
					type="LIST">
					
					{(provided) => (
						
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{display: "flex", gap: 16, alignItems: "flex-start", overflow:"auto"}}>
							
							{lists.map((list, index) => (
								<Draggable
									key={list._id}
									draggableId={String(list._id)}
									index={index}>
									
									{(draggableProvided) => (
										<div
											ref={draggableProvided.innerRef}
											{...draggableProvided.draggableProps}
											style={{ ...draggableProvided.draggableProps.style, minWidth:300 }}>
												<div {...draggableProvided.dragHandleProps}>
													<ListColumn list={list} tasks={tasksByList[list._id] || []} />
												</div>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>

				{ loading && <p> Loading lists..... </p> }
		</Container>
	);
};

export default BoardPage;