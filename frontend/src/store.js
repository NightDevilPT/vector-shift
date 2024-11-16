import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},

    getNodeID: (type) => {
        return `${type}-${uuidv4()}`;
    },

    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection) => {
        set({
            edges: addEdge({
                ...connection,
                type: 'smoothstep',
                animated: true,
                markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}
            }, get().edges),
        });
    },

    updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, [fieldName]: fieldValue };
                }
                return node;
            }),
        });
    },

    // Function to get data from nodes connected to a specific node
    getConnectedNodeData: (nodeId) => {
        const { edges, nodes } = get();

        // Find nodes connected as sources to this node
        const connectedNodes = edges
            .filter(edge => edge.target === nodeId)
            .map(edge => nodes.find(node => node.id === edge.source))
            .filter(node => node && node.data); // Filter nodes with existing data

        return connectedNodes;
    },

    removeNode: (nodeId) => {
        const { nodes, edges } = get();

        // Filter out the node to be removed
        const updatedNodes = nodes.filter(node => node.id !== nodeId);

        // Filter out edges connected to the removed node
        const updatedEdges = edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);

        set({
            nodes: updatedNodes,
            edges: updatedEdges
        });
    },
    updateNodeData: (nodeId, newData) => {
        set((state) => {
            const updatedNodes = state.nodes.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, data: { ...node.data, ...newData } };
                }
                return node;
            });
            return { nodes: updatedNodes };
        });
    },
    
}));
