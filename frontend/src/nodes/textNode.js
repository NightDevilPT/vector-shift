// frontend/src/nodes/textNode.js

import { useState, useEffect } from 'react';
import { BaseNode } from './baseNode';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeStyle, setNodeStyle] = useState({ height: 80 });  // Initialize with default height
  const [handles, setHandles] = useState([]);  // Store handles for variables

  const handleTextChange = (e) => setCurrText(e.target.value);

  useEffect(() => {
    // Dynamically adjust height based on text length
    const newHeight = Math.max(80, 30 + currText.length * 0.5);
    setNodeStyle((prevStyle) => ({ ...prevStyle, height: newHeight }));

    // Detect variables in {{variableName}} format
    const variableMatches = [...new Set(currText.match(/{{(.*?)}}/g))];
    setHandles(variableMatches);
  }, [currText]);

  return (
    <BaseNode style={nodeStyle} sourceHandle={true}>
      {handles.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: `${20 + index * 20}px` }}
        />
      ))}
      <div>
        <span>Text Node</span>
      </div>
      <div>
        <label>
          Text:
          <input type="text" value={currText} onChange={handleTextChange} />
        </label>
      </div>
    </BaseNode>
  );
};
