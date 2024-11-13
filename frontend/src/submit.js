// frontend/src/submit.js

import axios from 'axios';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();  // Access nodes and edges from your global store

  const handleSubmit = async () => {
    try {
      // Prepare the data payload
      const payload = { nodes, edges };

      // Send a POST request to the backend
      const response = await axios.post('http://127.0.0.1:8000/pipelines/parse', payload);

      // Display response data in an alert
      const { num_nodes, num_edges, is_dag } = response.data;
      alert(`Nodes: ${num_nodes}, Edges: ${num_edges}, Is DAG: ${is_dag}`);
    } catch (error) {
      console.error("Error submitting pipeline data:", error);
      alert("There was an error submitting the data to the backend.");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
