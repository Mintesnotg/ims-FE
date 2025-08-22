'use client'

import React, { useEffect, useRef, useState } from 'react';
import DataTable from '../DataTable';
import { GetAllRoles, GetRoleWithPrivilege, GetAllPrivileges, UpdateRole } from '../../../services/useraccount/roleservice';
import { Role } from '../../../types/response/roleresponse/roleresponse';
import { UpdatedRolePayload } from '../../../types/response/roleresponse/updateroleresponse';
import { PrivilegeItem } from '../../../types/response/roleresponse/privilegeresponse';
import Modal from '../Modal';
import Swal from 'sweetalert2';

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
  const [currentRoleId, setCurrentRoleId] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);

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
    setCurrentRoleId(id);
    try {
      const [assignedprevileges, allPrivRes] = await Promise.all([
        GetRoleWithPrivilege(id),
        GetAllPrivileges(),
      ]);
      debugger;
      if (allPrivRes.isSuccess && allPrivRes.data?.$values) {
        setAllPrivileges(allPrivRes.data.$values);
      } else {
        setAllPrivileges([]);
      }
      if (assignedprevileges.isSuccess && assignedprevileges.data) {
        setRoleDetails(assignedprevileges.data);
        setEditFields({ roleName: assignedprevileges.data.name, description: assignedprevileges.data.description });
        const currentAssigned = assignedprevileges.data.privileges?.$values?.map((p) => p.id) ?? [];
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

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete role?',
      text: 'Are you sure you want to delete this role? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    // TODO: Integrate delete API here
    await Swal.fire({
      icon: 'success',
      title: 'Deleted',
      text: 'Role has been deleted.',
      confirmButtonColor: '#1e3a8a',
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoleDetails(null);
    setSearchText('');
    setAllPrivileges([]);
    setAssignedIds(new Set());
    setCurrentRoleId('');
    setIsUpdating(false);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAssigned = (privId: string) => {
      debugger;
    setAssignedIds((prev) => {
      debugger
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
    if (!currentRoleId) {
      await Swal.fire({
        icon: 'warning',
        title: 'No role selected',
        text: 'Please select a role to update.',
        confirmButtonColor: '#1e3a8a'
      });
      return;
    }

    setIsUpdating(true);
    try {
      const privilegeIds = Array.from(assignedIds);
      const response = await UpdateRole(currentRoleId, privilegeIds);
    
      if (response.isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'Role updated successfully!',
          confirmButtonColor: '#1e3a8a'
        });
        // Refresh the roles list
        const updatedRoles = await fetchUserRoles();
        setData(updatedRoles);
        setIsModalOpen(false);
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Update failed',
          text: response.message || 'Unknown error occurred',
          confirmButtonColor: '#dc2626'
        });
      }
    } catch (error) {
      console.error('Error updating role:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error updating role',
        text: error instanceof Error ? error.message : 'Unknown error occurred',
        confirmButtonColor: '#dc2626'
      });
    } finally {
      setIsUpdating(false);
    }
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

  const selectAllRef = useRef<HTMLInputElement | null>(null);

  const filteredSelectedCount = filteredPrivileges.reduce((count, p) => count + (assignedIds.has(p.id) ? 1 : 0), 0);
  const allFilteredSelected = filteredPrivileges.length > 0 && filteredSelectedCount === filteredPrivileges.length;
  const noneFilteredSelected = filteredSelectedCount === 0;
  const isIndeterminate = !noneFilteredSelected && !allFilteredSelected;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate, filteredPrivileges.length, filteredSelectedCount]);

  const toggleSelectAllFiltered = () => {
    setAssignedIds((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        // unselect all filtered
        filteredPrivileges.forEach(p => next.delete(p.id));
      } else {
        // select all filtered
        filteredPrivileges.forEach(p => next.add(p.id));
      }
      return next;
    });
  };

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
            <button 
              onClick={handleUpdate} 
              disabled={isUpdating}
              className={`px-4 py-2 text-white rounded border ${
                isUpdating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-800 hover:bg-blue-500'
              }`}
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </button>
            {/* <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button> */}
          </>
        )}
      >

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
              <div className="mb-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search privileges..."
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
              <div className="mb-2 flex items-center gap-2">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleSelectAllFiltered}
                  className="h-4 w-4"
                />
                <span className="text-sm">Select all</span>
                {filteredPrivileges.length > 0 && (
                  <span className="ml-auto text-xs text-gray-500">{filteredSelectedCount}/{filteredPrivileges.length} selected</span>
                )}
              </div>
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
