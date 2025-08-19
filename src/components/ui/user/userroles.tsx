'use client'

import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import { GetAllRoles, GetRoleWithPrivilege, GetAllPrivileges } from '../../../services/useraccount/roleservice';
import { Role } from '../../../types/response/roleresponse/roleresponse';
import { UpdatedRolePayload } from '../../../types/response/roleresponse/updateroleresponse';
import { PrivilegeItem } from '../../../types/response/roleresponse/privilegeresponse';
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
    // window.location.href = "/login";

    console.error('Error fetching roles:', error);
    return [];
  }
};

const UserRolesPage = () => {
  const [data, setData] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [roleDetails, setRoleDetails] = useState<UpdatedRolePayload | null>(null);
  const [loadingRole, setLoadingRole] = useState(false);
  const [editFields, setEditFields] = useState<{ roleName: string; description: string }>({ roleName: '', description: '' });
  const [allPrivileges, setAllPrivileges] = useState<PrivilegeItem[]>([]);
  const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchUserRoles().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleEdit = async (id: string) => {
    debugger;
    setIsModalOpen(true);
    setLoadingRole(true);
    try {
      const [roleRes, allPrivRes] = await Promise.all([
        GetRoleWithPrivilege(id),
        GetAllPrivileges(),
      ]);
      debugger;
      if (allPrivRes.isSuccess && allPrivRes.data?.$values) {
        setAllPrivileges(allPrivRes.data.$values);
      } else {
        setAllPrivileges([]);
      }
      if (roleRes.isSuccess && roleRes.data) {
        setRoleDetails(roleRes.data);
        setEditFields({ roleName: roleRes.data.name, description: roleRes.data.description });
        const currentAssigned = roleRes.data.privileges?.$values?.map((p) => p.id) ?? [];
        setAssignedIds(new Set(currentAssigned));
      } else {
        setRoleDetails(null);
        setAssignedIds(new Set());
      }
    } catch (e) {
      console.error('Failed to load role details:', e);
    } finally {
      setLoadingRole(false);
    }
  };

  const handleDelete = (id: string) => {
    console.log('Delete role with ID:', id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoleDetails(null);
    setSearchText('');
    setAllPrivileges([]);
    setAssignedIds(new Set());
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAssigned = (privId: string) => {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      if (next.has(privId)) {
        next.delete(privId);
      } else {
        next.add(privId);
      }
      return next;
    });
  };

  const handleUpdate = async () => {
    // TODO: call update role API with editFields and Array.from(assignedIds)
    setIsModalOpen(false);
  };

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

  const filteredPrivileges = allPrivileges.filter((p) => {
            debugger;
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

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
            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-800 text-white hover:bg-blue-500 rounded border">Update</button>
            {/* <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button> */}
          </>
        )}
      >
        <div className="mb-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search privileges..."
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {loadingRole ? (
          <div className="py-6 text-center text-sm text-gray-500">Loading role details...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role Name</label>
              <input
                name="roleName"
                value={editFields.roleName}
                onChange={handleFieldChange}
                className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={editFields.description}
                onChange={handleFieldChange}
                className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Privileges</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto border rounded p-2">
                {filteredPrivileges.length === 0 ? (
                  <div className="col-span-2 text-sm text-gray-500">No privileges found</div>
                ) : (
                  filteredPrivileges.map((p) => {
                    const checked = assignedIds.has(p.id);
                    return (
                      <label key={p.id} className="flex items-start gap-2 p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAssigned(p.id)}
                          className="mt-1 h-4 w-4"
                        />
                        <div>
                          <div className="text-sm font-medium">{p.name}</div>
                          {p.description && (
                            <div className="text-xs text-gray-500">{p.description}</div>
                          )}
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserRolesPage;
