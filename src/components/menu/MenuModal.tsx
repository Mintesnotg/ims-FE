"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { MenuResponse, MenuRequest } from '@/types/response/menuresponse/menuresponse';
import { createMenu, updateMenu, getAllParentMenus } from '@/services/menucrudservice';
import { notify } from '@/components/providers/ToastProvider';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  menu?: MenuResponse | null;
  allMenus: MenuResponse[];
}

export default function MenuModal({ isOpen, onClose, onSuccess, menu, allMenus }: MenuModalProps) {
  const [formData, setFormData] = useState<MenuRequest>({
    name: '',
    parentId: null,
    url: '',
    icon: '',
    privileges: '',
    order: null,
  });
  const [loading, setLoading] = useState(false);
  const [allMenusForParent, setAllMenusForParent] = useState<MenuResponse[]>([]);
  const [parentSearchTerm, setParentSearchTerm] = useState('');
  const [showParentDropdown, setShowParentDropdown] = useState(false);

  const isEdit = !!menu;

  // Fetch all parent menus for dropdown when modal opens
  useEffect(() => {
    const fetchParentMenus = async () => {
      try {
        debugger;

        const parentMenus = await getAllParentMenus();
        debugger;
        setAllMenusForParent(parentMenus);
      } catch (error) {
        console.error('Failed to fetch parent menus for dropdown:', error);
        setAllMenusForParent([]);
      }
    };

    if (isOpen) {
        
      fetchParentMenus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (menu) {
      setFormData({
        name: menu.name,
        parentId: menu.parentId,
        url: menu.url || '',
        icon: menu.icon || '',
        privileges: menu.privilege || '',
        order: menu.order,
      });
      // Set the search term to show the selected parent menu name
      const selectedParent = allMenusForParent.find(m => m.id === menu.parentId);
      setParentSearchTerm(selectedParent?.name || '');
    } else {
      setFormData({
        name: '',
        parentId: null,
        url: '',
        icon: '',
        privileges: '',
        order: null,
      });
      setParentSearchTerm('');
    }
  }, [menu, isOpen, allMenusForParent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && menu) {
        await updateMenu(menu.id, formData);
        notify.success('Menu updated successfully');
      } else {
        await createMenu(formData);
        notify.success('Menu created successfully');
      }
      onSuccess();
    } catch (error) {
      notify.error(isEdit ? 'Failed to update menu' : 'Failed to create menu');
      console.error('Error saving menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'parentId' ? (value || null) : value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value ? parseInt(value, 10) : null,
    }));
  };

  // Filter parent options based on search term
  const filteredParentOptions = allMenusForParent.filter(menu =>
    menu.name.toLowerCase().includes(parentSearchTerm.toLowerCase())
  );

  const selectedParentMenu = allMenusForParent.find(menu => menu.id === formData.parentId);

  const handleParentSelect = (menuId: string | null) => {
    setFormData(prev => ({ ...prev, parentId: menuId }));
    setShowParentDropdown(false);
    setParentSearchTerm(selectedParentMenu?.name || '');
  };

  const handleParentSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentSearchTerm(e.target.value);
    setShowParentDropdown(true);
  };

  const footer = (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="submit"
        form="menu-form"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Menu' : 'Create Menu'}
      footer={footer}
    >
      <form id="menu-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter menu name"
          />
        </div>

        <div>
          <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
            Parent Menu
          </label>
          <div className="relative">
            <input
              type="text"
              id="parentId"
              name="parentId"
              value={parentSearchTerm}
              onChange={handleParentSearchChange}
              onFocus={() => setShowParentDropdown(true)}
              placeholder="Search for parent menu..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showParentDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                <div
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b"
                  onClick={() => handleParentSelect(null)}
                >
                  <span className="text-gray-500">No Parent (Root Menu)</span>
                </div>
                {filteredParentOptions.map((parentMenu) => (
                  <div
                    key={parentMenu.id}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleParentSelect(parentMenu.id)}
                  >
                    {parentMenu.name}
                  </div>
                ))}
                {filteredParentOptions.length === 0 && (
                  <div className="px-3 py-2 text-gray-500">
                    No menus found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter menu URL"
          />
        </div>

        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
            Icon
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={formData.icon || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter icon class or name"
          />
        </div>

        <div>
          <label htmlFor="privileges" className="block text-sm font-medium text-gray-700 mb-1">
            Privileges
          </label>
          <input
            type="text"
            id="privileges"
            name="privileges"
            value={formData.privileges || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter required privileges"
          />
        </div>

        <div>
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order || ''}
            onChange={handleNumberChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter display order"
            min="0"
          />
        </div>
      </form>
    </Modal>
  );
}
