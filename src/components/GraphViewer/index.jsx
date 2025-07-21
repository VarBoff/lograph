import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import RoundNode from '../RoundNode';

const nodeTypes = {
  roundNode: RoundNode,
};

const GraphViewer = ({ graph }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  useEffect(() => {
    if (graph.nodes && graph.edges) {
      setNodes(graph.nodes);
      setEdges(graph.edges);
    }
  }, [graph])

  return (
    <div style={{ height: '97vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        colorMode={"dark"}
        fitView
      >
        <Background bgColor="#282a36"/* bg */ color="#f8f8f2"/* fg */ />
        <Controls />
      </ ReactFlow>
    </div>
  );
}

export default GraphViewer;
 