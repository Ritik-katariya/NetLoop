import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import { useUpdateAdminMutation } from '../../redux/api/adminApi';
import { toast } from 'react-toastify';

const EditAdminModal = ({ isOpen, onClose, admin }) => {
  const [updateAdmin] = useUpdateAdminMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
    status: true
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        password: '',
        role: admin.role,
        status: admin.status
      });
    }
  }, [admin]);

  const roles = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'MODERATOR', label: 'Moderator' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = () => {
    setFormData(prev => ({
      ...prev,
      status: !prev.status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      await updateAdmin({
        id: admin.id,
        data: updateData
      }).unwrap();

      toast.success('Admin updated successfully');
      onClose();
    } catch (error) {
      toast.error(error.data?.message || 'Failed to update admin');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Edit Admin</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Input
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <Input
                type="password"
                label="New Password (optional)"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
              
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>

              <div className="flex justify-between items-center">
                <span>Status</span>
                <Switch
                  checked={formData.status}
                  onChange={handleStatusChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditAdminModal; 