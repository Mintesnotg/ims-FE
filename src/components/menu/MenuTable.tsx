"use client";
import React, { useState, useEffect } from 'react';
import DataTable from "@/components/ui/DataTable";
import { MenuResponse, Pagination } from "@/types/response/menuresponse/menuresponse";
import { getAllMenus, deleteMenu } from "@/services/menucrudservice";
import { notify } from '@/components/providers/ToastProvider';
import MenuModal from './MenuModal';

interface MenuTableProps {
  refreshTrigger?: number;
}

export default function MenuTable({ refreshTrigger = 0 }: MenuTableProps) {
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [pagination, setPagination] = useState<Pagination<MenuResponse> | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuResponse | null>(null);

  const pageSize = 5;

  const fetchMenus = async (page: number = 1) => {
    try {
        debugger;
      setLoading(true);
      const response = await getAllMenus({ page, pageSize });
      console.log(response.items);
      setMenus(response.items?.$values || []);
      setPagination(response);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {
      notify.error('Failed to fetch menus');
      console.error('Error fetching menus:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus(1); // Always start with page 1 on initial load
  }, [refreshTrigger]);

  const handlePageChange = (page: number) => {
    fetchMenus(page);
  };

  const handleCreate = () => {
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  const handleEdit = (menu: MenuResponse) => {
    debugger;
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      try {
        await deleteMenu(id);
        notify.success('Menu deleted successfully');
        fetchMenus(currentPage || 1);
      } catch (error) {
        notify.error('Failed to delete menu');
        console.error('Error deleting menu:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingMenu(null);
  };

  const handleModalSuccess = () => {
    fetchMenus(currentPage || 1);
    handleModalClose();
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'url', label: 'URL' },
    { key: 'icon', label: 'Icon' },
    { key: 'privilege', label: 'Privilege' },
    { key: 'order', label: 'Order' },
    { key: 'actions', label: 'Actions' },
  ];

  const tableData = menus.map((menu) => ({
    name: menu.name,
    url: menu.url || '-',
    icon: menu.icon || '-',
    privilege: menu.privilege || '-',
    order: menu.order || '-',
    actions: (
      <div className="flex gap-2">
        <button
          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => handleEdit(menu)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => handleDelete(menu.id)}
        >
          Delete
        </button>
      </div>
    ),
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading menus...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          <i className="fas fa-plus mr-2"></i>
          Create Menu
        </button>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        rowsPerPage={pageSize}
        serverSidePagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />


      <MenuModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        menu={editingMenu}
        allMenus={menus}
      />
    </div>
  );
}
