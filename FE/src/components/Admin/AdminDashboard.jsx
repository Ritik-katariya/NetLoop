import React, { useState } from 'react';
import { useGetAllAdminsQuery, useDeleteAdminMutation } from '../../redux/api/adminApi';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../../redux/features/admin/adminSlice';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import CreateAdminModal from './CreateAdminModal';
import EditAdminModal from './EditAdminModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { data: admins, isLoading, error } = useGetAllAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    onEditOpen();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await deleteAdmin(id).unwrap();
        toast.success('Admin deleted successfully');
      } catch (error) {
        toast.error(error.data?.message || 'Failed to delete admin');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {currentAdmin?.role === 'SUPER_ADMIN' && (
          <Button color="primary" onPress={onCreateOpen}>
            Create Admin
          </Button>
        )}
      </div>

      <Table aria-label="Admins table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          {currentAdmin?.role === 'SUPER_ADMIN' && (
            <TableColumn>ACTIONS</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {admins?.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  admin.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {admin.status ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              {currentAdmin?.role === 'SUPER_ADMIN' && (
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      isIconOnly
                      color="primary" 
                      variant="light"
                      onPress={() => handleEdit(admin)}
                    >
                      <FaEdit />
                    </Button>
                    <Button 
                      isIconOnly
                      color="danger" 
                      variant="light"
                      onPress={() => handleDelete(admin.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CreateAdminModal 
        isOpen={isCreateOpen} 
        onClose={onCreateClose} 
      />

      {selectedAdmin && (
        <EditAdminModal 
          isOpen={isEditOpen} 
          onClose={onEditClose}
          admin={selectedAdmin}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminDashboard; 