import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';
import { calculateResults } from '../utils/calculateResults';

const StudentCRUD = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 20,
      m1: 85,
      m2: 90,
      m3: 78,
      m4: 82,
      m5: 88,
      percentage: 84.6,
      division: 'First Division'
    }
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    age: '',
    m1: '',
    m2: '',
    m3: '',
    m4: '',
    m5: ''
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: info => info.getValue()
    },
    {
      header: 'Age',
      accessorKey: 'age',
      cell: info => info.getValue()
    },
    {
      header: 'Marks 1',
      accessorKey: 'm1',
      cell: info => info.getValue()
    },
    {
      header: 'Marks 2',
      accessorKey: 'm2',
      cell: info => info.getValue()
    },
    {
      header: 'Marks 3',
      accessorKey: 'm3',
      cell: info => info.getValue()
    },
    {
      header: 'Marks 4',
      accessorKey: 'm4',
      cell: info => info.getValue()
    },
    {
      header: 'Marks 5',
      accessorKey: 'm5',
      cell: info => info.getValue()
    },
    {
      header: 'Percentage',
      accessorKey: 'percentage',
      cell: info => info.getValue()
    },
    {
      header: 'Division',
      accessorKey: 'division',
      cell: info => info.getValue()
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => confirmDelete(row.original)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    }
  ];

  const filteredData = data.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(nameFilter.toLowerCase());
    const divisionMatch = divisionFilter === '' || student.division === divisionFilter;
    return nameMatch && divisionMatch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { percentage, division } = calculateResults(formData);
    
    if (formData.id) {
      setData(data.map(student => 
        student.id === formData.id 
          ? { ...formData, percentage, division } 
          : student
      ));
    } else {
      const newStudent = {
        id: data.length > 0 ? Math.max(...data.map(s => s.id)) + 1 : 1,
        ...formData,
        percentage,
        division
      };
      setData([...data, newStudent]);
    }
    
    setFormData({
      id: null,
      name: '',
      age: '',
      m1: '',
      m2: '',
      m3: '',
      m4: '',
      m5: ''
    });
  };

  const handleEdit = (student) => {
    setFormData({
      id: student.id,
      name: student.name,
      age: student.age,
      m1: student.m1,
      m2: student.m2,
      m3: student.m3,
      m4: student.m4,
      m5: student.m5
    });
  };

  const confirmDelete = (student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setData(data.filter(student => student.id !== studentToDelete.id));
    setIsDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Record Management</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Search Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search by Name:</label>
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="p-2 border rounded"
              placeholder="Enter student name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Division:</label>
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">All Divisions</option>
              <option value="First Division">First Division</option>
              <option value="Second Division">Second Division</option>
              <option value="Third Division">Third Division</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
        </div>
      </div>
      
      <StudentForm 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isEditing={!!formData.id}
      />
      
      {formData.id && (
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Results Preview</h2>
          <div className="grid grid-cols-2 gap-2">
            <div><span className="font-medium">Percentage:</span> {calculateResults(formData).percentage}</div>
            <div><span className="font-medium">Division:</span> {calculateResults(formData).division}</div>
          </div>
        </div>
      )}
      
      <StudentTable 
        data={filteredData} 
        columns={columns} 
      />
      
      <Transition appear show={isDeleteDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDeleteDialogOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the record for {studentToDelete?.name}?
                    </p>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default StudentCRUD;