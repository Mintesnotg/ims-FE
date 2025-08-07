'use client'

import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'email', label: 'Email' },
];

// Simulate API call
const fetchUserRoles = async () => {
  // Replace with real API call
  return [
    { id: 1, name: 'Alice', role: 'Admin', email: 'alice@example.com' },
    { id: 2, name: 'Bob', role: 'User', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', role: 'User', email: 'charlie@example.com' },
    { id: 4, name: 'David', role: 'Manager', email: 'david@example.com' },
    { id: 5, name: 'Eve', role: 'User', email: 'eve@example.com' },
    { id: 6, name: 'Frank', role: 'Admin', email: 'frank@example.com' },
  ];
};

const UserRolesPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRoles().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-1xl text-center font-bold mb-4">User Roles</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns}  data={data} rowsPerPage={4} />
      )}
    </div>
  );
};

export default UserRolesPage;
