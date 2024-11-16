import { useState } from "react";
import { useStore } from "../store";
import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
	const [currName, setCurrName] = useState("");
	const [inputType, setInputType] = useState(data.inputType || "Text");

	// Get the store's updateNodeField function
	const updateNodeField = useStore((state) => state.updateNodeField);

	// Update store whenever currName changes
	const handleNameChange = (e) => {
		const newName = e.target.value;
		setCurrName(newName);
		updateNodeField(id, "inputName", newName); // Update the store with the new name
	};

	// Update store whenever inputType changes
	const handleTypeChange = (e) => {
		const newType = e.target.value;
		setInputType(newType);
		updateNodeField(id, "inputType", newType); // Update the store with the new type
	};

	return (
		<BaseNode
			className="p-3 text-gray-700 bg-white" // Tailwind styling for node container
			sourceHandle={true}
			title={"Input Node"}
			id={id}
		>
			<div className="w-full h-full">
				<div className="w-full flex items-center gap-2 mb-2">
					<label className="block text-xs font-medium text-gray-700 min-w-10">
						Name:
					</label>
					<input
						type="text"
						value={currName}
						onChange={handleNameChange}
						className="rounded-lg border border-gray-300 p-1 text-gray-700 text-xs"
					/>
				</div>
				<div className="w-full flex items-center gap-2 mb-2">
					<label className="block text-xs font-medium text-gray-700 min-w-10">
						Type:
					</label>
					<select
						value={inputType}
						onChange={handleTypeChange}
						className="rounded-lg border border-gray-300 p-1 text-gray-700 text-xs"
					>
						<option value="Text">Text</option>
						<option value="File">File</option>
					</select>
				</div>
			</div>
		</BaseNode>
	);
};

