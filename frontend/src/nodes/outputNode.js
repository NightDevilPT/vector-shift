import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [connectedData, setConnectedData] = useState(null);

  // Access the function to get connected node data and the current edges and nodes
  const getConnectedNodeData = useStore((state) => state.getConnectedNodeData);
  const edges = useStore((state) => state.edges);

  useEffect(() => {
    // Get data from any nodes connected to this output node
    const connectedNodes = getConnectedNodeData(id);

    if (connectedNodes.length > 0) {
      const nodeData = connectedNodes[0].data;

      // Check if the connected node has transformed data (e.g., resolvedText in TextNode)
      const transformedData = nodeData;
      console.log(nodeData,'@#@#@#@#')

      setConnectedData(transformedData);
    } else {
      setConnectedData(null); // Set to null if no connected nodes
    }
  }, [id, edges, getConnectedNodeData]); // Run this effect whenever edges change

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);
  

  return (
    <BaseNode className="p-3 text-gray-700" targetHandle={true} title={"Output Node"} id={id}>
      <div className="w-full h-full">
        <label className="block mb-1 text-xs font-medium text-gray-700">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            disabled
            className="ml-2 rounded-lg border border-gray-300 p-1 text-gray-700 text-sm"
          />
        </label>
        <label className="block mb-2 text-xs font-medium text-gray-700">
          Type:
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="ml-2 rounded-lg border border-gray-300 p-1 text-gray-700 text-sm"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>

        {/* Display connected node data if available, or connection status */}
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
