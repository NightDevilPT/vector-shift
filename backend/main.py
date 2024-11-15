# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.get('/')
async def root():
    return {"message": "Python backend is working"}

@app.post('/pipelines/parse')
async def parse_pipeline(data: PipelineData):
    # Extract only node IDs and edge connections from the input payload
    node_ids = [node.id for node in data.nodes]
    edges = [(edge.source, edge.target) for edge in data.edges]
    
    # Number of nodes and edges
    num_nodes = len(node_ids)
    num_edges = len(edges)
    
    # Check if the graph is a Directed Acyclic Graph (DAG)
    is_dag_result = is_dag(node_ids, edges)
    
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag_result}

def is_dag(nodes, edges):
    # Convert edges to adjacency list for each node
    adj_list = {node: [] for node in nodes}
    for source, target in edges:
        adj_list[source].append(target)

    # Detect cycle using DFS
    visited = set()
    stack = set()

    def dfs(node):
        if node in stack:
            return False  # cycle detected
        if node in visited:
            return True
        stack.add(node)
        for neighbor in adj_list.get(node, []):
            if not dfs(neighbor):
                return False
        stack.remove(node)
        visited.add(node)
        return True

    # Check each node to ensure there are no cycles in the graph
    for node in adj_list:
        if node not in visited:
            if not dfs(node):
                return False
    return True
