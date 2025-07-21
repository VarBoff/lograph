import React from 'react'
import { Handle, Position } from '@xyflow/react';

const RoundNode = ({ data, selected }) => {
  return (
    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center 
                     ${selected ? 'bg-dracula-purple' : 'bg-dracula-selection'}`}>
      <p>{data.label}</p>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Handle
          type="source"
          position={Position.Top}
          className="!bg-transparent !border-transparent"
        />
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-transparent !border-transparent"
        />
      </div>
    </div>
  );
}

export default RoundNode;