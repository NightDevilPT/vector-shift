// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ children, style, sourceHandle, targetHandle }) => (
  <div style={{ ...defaultStyle, ...style }}>
    {targetHandle && (
      <Handle type="target" position={Position.Left} />
    )}
    {children}
    {sourceHandle && (
      <Handle type="source" position={Position.Right} />
    )}
  </div>
);

const defaultStyle = {
  width: 'auto',
  height: 'auto',
  border: '1px solid black',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  borderRadius: '8px',
  backgroundColor: '#1C2536',
  color: '#fff',
  paddingInline:'20px',
  paddingBlock:'10px'
};
