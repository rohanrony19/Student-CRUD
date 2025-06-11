import React from 'react';

const StudentForm = ({ formData, handleInputChange, handleSubmit, isEditing }) => {
  return (
    <div className="mb-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">
        {isEditing ? 'Update Student Record' : 'Enter Student Record'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Student Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Student Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marks 1:</label>
          <input
            type="number"
            name="m1"
            value={formData.m1}
            onChange={handleInputChange}
            required
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marks 2:</label>
          <input
            type="number"
            name="m2"
            value={formData.m2}
            onChange={handleInputChange}
            required
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marks 3:</label>
          <input
            type="number"
            name="m3"
            value={formData.m3}
            onChange={handleInputChange}
            required
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marks 4:</label>
          <input
            type="number"
            name="m4"
            value={formData.m4}
            onChange={handleInputChange}
            required
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marks 5:</label>
          <input
            type="number"
            name="m5"
            value={formData.m5}
            onChange={handleInputChange}
            required
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2 flex justify-end space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {isEditing ? 'Update' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => handleInputChange({ target: { name: 'reset', value: true }})}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;