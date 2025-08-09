import React, { useState } from 'react';

import "./style.css"
function AddDestination({ onAddDestination }) {
  const [destination, setDestination] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestination(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDestination(destination);
    setDestination({ name: '', description: '' });
  };

  return (
    <div className="add-destination">
      <h2>Add New Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Destination Name:</label>
          <input
            type="text"
            name="name"
            value={destination.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={destination.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
}

export default AddDestination;