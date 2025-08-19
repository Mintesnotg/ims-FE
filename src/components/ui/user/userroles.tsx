'use client'

import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import { GetAllRoles } from '../../../services/useraccount/roleservice';
import { Role } from '../../../types/response/roleresponse/roleresponse';
import Modal from '../Modal';

const columns = [
  { key: 'no', label: 'No_' },
  { key: 'roleName', label: 'Role Name' },
  { key: 'description', label: 'Description' },
  { key: 'registeredDate', label: 'Registered Date' },
  { key: 'actions', label: 'Actions' },
];

// Fetch roles from API
const fetchUserRoles = async () => {
  try {
    const response = await GetAllRoles();
    if (response.isSuccess && response.data?.$values) {
      return response.data.$values;
    }
    return [];
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

const UserRolesPage = () => {
  const [data, setData] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingRole, setEditingRole] = useState<Role | null>(null);
  // const [editFields, setEditFields] = useState<{ roleName: string; description: string }>({ roleName: '', description: '' });

  useEffect(() => {
    fetchUserRoles().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id: string) => {
    const role = data.find((r) => r.id === id) || null;
    // setEditingRole(role);
    if (role) {
      // setEditFields({ roleName: role.roleName, description: role.description });
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log('Delete role with ID:', id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // setEditingRole(null);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSave = async () => {
  //   if (!editingRole) return;
  //   // TODO: Call update role API here
  //   setData((prev) =>
  //     prev.map((r) =>
  //       r.id === editingRole.id ? { ...r, roleName: editFields.roleName, description: editFields.description } : r
  //     )
  //   );
  //   setIsModalOpen(false);
  //   setEditingRole(null);
  // };

  // Transform data to include action buttons and auto-increment number
  const transformedData = data.map((role, index) => ({
    no: index + 1,
    ...role,
    registeredDate: new Date(role.registeredDate).toLocaleDateString(),
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(role.id)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(role.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="p-8">
      <h1 className="text-1xl text-center font-bold mb-4">User Roles</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-lg">Loading roles...</div>
        </div>
      ) : (
        <DataTable columns={columns} data={transformedData} rowsPerPage={4} />
      )}

      <Modal
        isOpen={isModalOpen}
        title="Edit Role"
        onClose={handleCloseModal}
        footer={(
          <>
            <button onClick={handleCloseModal} className="px-4 py-2 rounded border">Cancel</button>
            {/* <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button> */}
          </>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <input
              name="roleName"
              // value={editFields.roleName}
              onChange={handleFieldChange}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              // value={editFields.description}
              onChange={handleFieldChange}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserRolesPage;
