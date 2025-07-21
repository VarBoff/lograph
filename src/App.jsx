import React, { useState, useCallback, useEffect } from 'react';
import GraphViewer from './components/GraphViewer';
import ControlPanel from './components/ControlPanel';
import { parseLog } from './utils/logParser';

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, type: 'roundNode', data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, type: 'roundNode', data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

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