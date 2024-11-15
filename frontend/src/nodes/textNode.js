import { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]); // Store variables from the text

  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null); // Ref to access textarea

  // Update the text in local and global state
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, "text", newText); // Update the raw text in global state
  };

  useEffect(() => {
    // Adjust textarea dimensions based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to content
    }

    // Detect variables in the format {{variableName}}
    const variableMatches = Array.from(new Set(currText.match(/{{(.*?)}}/g)));
    setVariables(variableMatches);
  }, [currText]);

  // Prepare handlers array for BaseNode
  const handlers = variables.map((variable, index) => ({
    position: Position.Left,
    label: variable.replace(/{{|}}/g, ""), // Display name without braces
  }));

  return (
    <BaseNode
      className="text-gray-700 min-w-40"
      sourceHandle={true}
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
      </div>
    </BaseNode>
  );
};
