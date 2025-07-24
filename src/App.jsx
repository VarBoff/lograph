import React, { useState, useCallback, useEffect } from 'react';
import GraphViewer from './components/GraphViewer';
import ControlPanel from './components/ControlPanel';
import { parseLog } from './utils/logParser';
import { ReactFlowProvider } from '@xyflow/react';

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, type: 'roundNode', data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, type: 'roundNode', data: { label: 'Node 2' } },
  { id: 'n3', position: { x: 100, y: 0 }, type: 'roundNode', data: { label: 'Node 3' } },
  { id: 'n4', position: { x: 100, y: 100 }, type: 'roundNode', data: { label: 'Node 4' } },
  { id: 'n5', position: { x: 200, y: 0 }, type: 'roundNode', data: { label: 'Node 5' } },
  { id: 'n6', position: { x: 200, y: 100 }, type: 'roundNode', data: { label: 'Node 6' } },

];
const initialEdges = [
  { id: 'n1-n2', source: 'n1', target: 'n2', type: 'straight', style: { stroke: '#f8f8f2' } },
  { id: 'n4-n5', source: 'n4', target: 'n5', type: 'straight', style: { stroke: '#f8f8f2' } },
  { id: 'n5-n6', source: 'n5', target: 'n6', type: 'straight', style: { stroke: '#f8f8f2' } },
  { id: 'n6-n4', source: 'n6', target: 'n4', type: 'straight', style: { stroke: '#f8f8f2' } },
];

function App() {
  const [graphData, setGraphData] = useState({ nodes: initialNodes, edges: initialEdges });
  
  const handleFileParse = useCallback((logText) => {
    const data = parseLog(logText);
    console.log("Parsed Data:", data);
    setGraphData(data);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ControlPanel onFileParse={handleFileParse}/>
      <GraphViewer graph={graphData}/>
    </div>
  );
}

export default App;