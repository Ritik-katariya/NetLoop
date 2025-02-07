import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, useDisclosure, Chip } from "@nextui-org/react";
import { useDeleteAdminMutation } from '../../redux/api/adminApi';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditAdminModal from '../Admin/EditAdminModal';

const AdminList = ({ admins }) => {
  const [deleteAdmin] = useDeleteAdminMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    onOpen();
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

  const columns = [
    { key: "name", label: "NAME" },
    { key: "email", label: "EMAIL" },
    { key: "role", label: "ROLE" },
    { key: "status", label: "STATUS" },
    { key: "actions", label: "ACTIONS" }
  ];

  const renderCell = (admin, columnKey) => {
    switch (columnKey) {
      case "name":
        return <div className="font-medium">{admin.name}</div>;
      case "email":
        return <div className="text-sm">{admin.email}</div>;
      case "role":
        return (
          <Chip
            color={admin.role === 'SUPER_ADMIN' ? 'danger' : 'primary'}
            variant="flat"
            size="sm"
          >
            {admin.role}
          </Chip>
        );
      case "status":
        return (
          <Chip
            color={admin.status ? 'success' : 'danger'}
            variant="flat"
            size="sm"
          >
            {admin.status ? 'Active' : 'Inactive'}
          </Chip>
        );
      case "actions":
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Table aria-label="Admin table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {admins?.map((admin) => (
            <TableRow key={admin.id}>
              {columns?.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(admin, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedAdmin && (
        <EditAdminModal
          isOpen={isOpen}
          onClose={onClose}
          admin={selectedAdmin}
        />
      )}
    </div>
  );
};

export default AdminList; 