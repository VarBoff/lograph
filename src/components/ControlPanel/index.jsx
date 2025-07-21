import React from 'react';

const ControlPanel = ({ onFileParse }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      onFileParse(content);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ControlPanel;