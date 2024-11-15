import { Handle } from "reactflow";
import { useStore } from '../store';
import { v4 as uuidv4 } from 'uuid';

export const BaseNode = ({
  id,
  title,
  children,
  style,
  sourceHandle = false,
  targetHandle = false,
  handlers = [], // New prop: array of handler objects
}) => {
  const removeNode = useStore((state) => state.removeNode);
  return (
    <div className={`p-3 rounded-lg shadow-md border-[1px] border-slate-200 bg-white ${style}`}>
      <div className="flex justify-between items-center w-full font-bold text-base">
        <span>{title}</span>
        <button
          onClick={() => removeNode(id)} // Placeholder for remove function
          className="bg-transparent border-none text-gray-600 cursor-pointer text-lg"
        >
          ✕
        </button>
      </div>
      <hr className="w-full border-gray-300 my-2" />

      {/* Conditionally render handlers */}
      {handlers.map((handler, index) => (
        <div
          key={uuidv4()}
          className="absolute flex items-center"
          style={{ top: `${20 + index * 28}px`, left: "0px" }}
        >
          <Handle
            type="target"
            position={handler.position}
            id={uuidv4()}
          />
          <div className="absolute z-10 right-2 text-xs text-gray-400 ml-1 px-2 rounded-full border border-gray-300">
            {handler.label}
          </div>
        </div>
      ))}

      {children}

      {/* Conditionally render source and target handles */}
      {sourceHandle && <Handle type="source" position="right" />}
      {targetHandle && <Handle type="target" position="left" />}
    </div>
  );
};
