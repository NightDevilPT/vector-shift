import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const [connectedData, setConnectedData] = useState(null); // State to store connected node data

  // Fetch the store's function to get connected node data
  const getConnectedNodeData = useStore((state) => state.getConnectedNodeData);
  const edges = useStore((state) => state.edges); // Listen for changes in edges
  const nodes = useStore((state) => state.nodes); // Listen for changes in nodes

  useEffect(() => {
    // Fetch data from connected nodes whenever edges or nodes change
    const connectedNodes = getConnectedNodeData(id);
    setConnectedData(connectedNodes.length > 0 ? connectedNodes[0].data : null); // Show the first connected node's data if available
  }, [id, edges, nodes, getConnectedNodeData]); // Re-run this effect when edges or nodes change

  return (
    <BaseNode className="p-3 text-gray-700" sourceHandle={true} targetHandle={true} title={"LLM Node"} id={id}>
      <div className="w-full h-full">
        <span className="block mb-2 text-gray-700 text-sm">
          This is an LLM node.
        </span>

        {/* Display connected node data if available */}
        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm">
          {connectedData ? (
            <>
              <h4 className="mb-1 font-semibold">Connected Node Data:</h4>
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(connectedData, null, 2)}
              </pre>
            </>
          ) : (
            <div className="text-gray-400">No connected node or data available</div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};
