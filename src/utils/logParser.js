export const parseLog = (logText) => {
    if (!logText) {
      return { nodes: [], edges: []};
    }
  
    const lines = logText.split('\n').filter(line => line.trim()!== '');
    const nodesMap = new Map();
    const edgesSet = new Set();
  
    const getEdgeId = (source, target) => {
      return [source, target].sort().join('-');
    };
  
    lines.forEach((line) => {
      const parts = line.split(' : ').map(p => p.trim());
      if (parts.length < 2) return;
  
      const keyValuePairs = parts.slice(2);
      const lineNodeIds = [];
  
      keyValuePairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        if (key && value) {
          const nodeId = value;
          
          if (!nodesMap.has(nodeId)) {
            nodesMap.set(nodeId, {
              id: nodeId,
              type: 'roundNode',
              position: { x: Math.random() * 800, y: Math.random() * 600 },
              data: { label: `${key}=${value}` }, 
            });
          }
          lineNodeIds.push(nodeId);
        }
      });
  
      if (lineNodeIds.length > 1) {
        for (let i = 0; i < lineNodeIds.length; i++) {
          for (let j = i + 1; j < lineNodeIds.length; j++) {
            const source = lineNodeIds[i];
            const target = lineNodeIds[j];
            const edgeId = getEdgeId(source, target);
  
            if (!edgesSet.has(edgeId)) {
              edgesSet.add(edgeId);
            }
          }
        }
      }
    });
  
    const nodes = Array.from(nodesMap.values());
    const edges = Array.from(edgesSet).map(edgeId => {
      const [source, target] = edgeId.split('-');
      return { id: `e-${source}-${target}`, source, target, type: 'straight', style: { stroke: '#f8f8f2' } };
    });
  
    return { nodes, edges };
};