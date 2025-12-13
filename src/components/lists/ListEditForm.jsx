import * as yup from "yup";
import { forwardRef } from "react";

import { CustomForm } from "@/components/form";
const ListEditForm = forwardRef(({ list, onSubmit }, ref) => {

	const listFields = [
		{
			name: "title",
			label: "Title",
			type: "text",
		}
	];

	const listSchema = yup.object({
		title: yup.string().required("Title is required"),
	});

	return (<CustomForm 
				ref={ref} 
				fields={listFields}
				validationSchema={listSchema} 
				defaultValues={{ title: list.title }} 
				submitLabel="Save"
				onSubmit={onSubmit}
				name={`EditListForm`}
				onError={errors => console.log("List Edit Form Errors :", errors)}
				submitInside={false}
			/>)
	
} );

export default ListEditForm;