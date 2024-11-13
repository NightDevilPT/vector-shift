// frontend/src/nodes/llmNode.js
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode sourceHandle={true} targetHandle={true}>
      <div>
        <span>LLM Node</span>
      </div>
      <div>
        <span>This is a LLM node.</span>
      </div>
    </BaseNode>
  );
};
