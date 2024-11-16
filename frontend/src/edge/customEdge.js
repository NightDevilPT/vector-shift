// edge/customEdge.js
import React from "react";
import { getBezierPath, getEdgeCenter } from "reactflow";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleEdgeRemove = () => {
    if (data?.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <>
      <path id={id} className="react-flow__edge-path stroke-gray-400" d={edgePath} />
      <g transform={`translate(${labelX-15}, ${labelY-15})`}>
        <foreignObject width="30" height="30" className="cursor-pointer">
          <div
            className="flex items-center justify-center border-2 border-gray-200 bg-white text-slate-400 rounded-full w-6 h-6 text-xs"
            onClick={handleEdgeRemove}
          >
            ✕
          </div>
        </foreignObject>
      </g>
    </>
  );
};

export default CustomEdge;
