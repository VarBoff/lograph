import { useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceLink } from 'd3-force';
import '@xyflow/react/dist/style.css';
import RoundNode from '../RoundNode';

const nodeTypes = {
  roundNode: RoundNode,
};

const GraphViewer = ({ graph }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const simulationRef = useRef();

  useEffect(() => {
    if (!graph.nodes || graph.nodes.length === 0) return;

    const simulationNodes = graph.nodes.map(node => ({ ...node }));
    const simulationEdges = graph.edges.map(edge => ({ ...edge }));

    simulationRef.current = forceSimulation(simulationNodes)
      .force('x', forceX(0).strength(0.05))
      .force('y', forceY(0).strength(0.05))
      .force('collide', forceCollide(50))
      .force('charge', forceManyBody().strength(-700))
      .force('link', forceLink(simulationEdges).id(d => d.id).distance(120).strength(1))
      .on('tick', () => {
        setNodes(currentNodes =>
          currentNodes.map(node => {
            const simNode = simulationRef.current.nodes().find(sn => sn.id === node.id);
            return { ...node, position: { x: simNode.x, y: simNode.y } };
          })
        );
      })
      .alpha(0.3).restart();

    setNodes(graph.nodes);
    setEdges(graph.edges);

    return () => simulationRef.current.stop();
  }, [graph, setNodes, setEdges]);

  const onNodeDragStart = () => {
    simulationRef.current?.stop();
  };

  const onNodeDragStop = (event, draggedNode) => {
    if (!simulationRef.current) return;
    
    simulationRef.current.nodes().forEach(simNode => {
      const reactFlowNode = nodes.find(n => n.id === simNode.id);
      if (reactFlowNode) {
        simNode.x = reactFlowNode.position.x;
        simNode.y = reactFlowNode.position.y;
      }
    });

    simulationRef.current.alpha(0.3).restart();
  };

  return (
    <div style={{ height: '97vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        colorMode={"dark"}
      >
        <Background bgColor="#282a36" color="#f8f8f2" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default GraphViewer;