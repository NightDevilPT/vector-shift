import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
	const [currText, setCurrText] = useState(data?.text || "{{input}}");
	const [variables, setVariables] = useState([]); // Store variables from the text
	const [connectedData, setConnectedData] = useState({}); // Store data from connected nodes
	const [resolvedText, setResolvedText] = useState(""); // Track resolved text

	const updateNodeField = useStore((state) => state.updateNodeField);
	const getConnectedNodeData = useStore(
		(state) => state.getConnectedNodeData
	); // Fetch connected node data
	const edges = useStore((state) => state.edges); // Get edges to detect changes in connections
	const textareaRef = useRef(null); // Ref to access textarea

	// Update the text in local and global state
	const handleTextChange = (e) => {
		const newText = e.target.value;
		setCurrText(newText);
		updateResolvedText(newText, connectedData); // Compute and save resolved text
	};

	// Function to compute and update resolvedText in the store
	const updateResolvedText = (rawText, data) => {
		// Detect variables in the format {{variableName}}
		const variableMatches = Array.from(
			new Set(rawText.match(/{{(.*?)}}/g))
		);
		const cleanVariables = variableMatches.map((v) =>
			v.replace(/{{|}}/g, "")
		); // Remove braces
		setVariables(cleanVariables);

		// Replace variables in `rawText` with connected data values
		let newResolvedText = rawText;
		cleanVariables.forEach((variable) => {
			if (data[variable]) {
				const regex = new RegExp(`{{${variable}}}`, "g"); // Replace all occurrences
				newResolvedText = newResolvedText.replace(
					regex,
					data[variable]
				);
			}
		});

		// Update both raw and resolved text in the global store
		updateNodeField(id, "text", rawText);
		updateNodeField(id, "resolvedText", newResolvedText); // Save resolved text
		setResolvedText(newResolvedText); // Update local state as well
	};

	// Update connected data whenever edges or node connections change
	useEffect(() => {
		const updatedConnectedData = {};
		const connectedNodes = getConnectedNodeData(id);

		// Map connected node data to variable names in `currText`
		connectedNodes.forEach((node) => {
			if (node.data && node.data.inputName) {
				updatedConnectedData["input"] = node.data.inputName;
			}
		});

		setConnectedData(updatedConnectedData);

		// Update resolvedText based on new connected data
		updateResolvedText(currText, updatedConnectedData);

		// Notify store about the change
		updateNodeField(id, "connectedData", updatedConnectedData);
	}, [id, edges, getConnectedNodeData]);

	// Adjust textarea dimensions based on content
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"; // Reset height
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to content
		}
	}, [currText]);

	// Prepare handlers array for BaseNode
	const handlers = variables.map((variable) => ({
		position: Position.Left,
		label: variable, // Display variable name
		id: `${id}-${variable}`, // Ensure unique IDs for each handler
	}));

	return (
		<BaseNode
			className="text-gray-700 min-w-40"
			sourceHandle={true} // Allows it to connect as a source node
			title={"Text Node"}
			id={id}
			handlers={handlers} // Pass handlers to BaseNode
		>
			<div className="w-full h-full">
				<label>
					<textarea
						ref={textareaRef} // Attach ref to textarea
						value={currText}
						className="w-full h-auto overflow-hidden resize-none rounded-lg border border-gray-300 text-gray-700"
						onChange={handleTextChange}
					/>
				</label>
				<p className="text-xs text-gray-500 mt-2">
					Variables:{" "}
					{variables.length ? variables.join(", ") : "None"}
				</p>
				<p className="text-xs text-gray-400 mt-2">
					<strong>Raw Text:</strong> {currText}
				</p>
				<p className="text-xs text-gray-400">
					<strong>Resolved Text:</strong> {resolvedText}
				</p>
			</div>
		</BaseNode>
	);
};
