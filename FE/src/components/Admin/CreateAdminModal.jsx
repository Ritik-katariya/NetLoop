import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useCreateAdminMutation } from '../../redux/api/adminApi';
import { toast } from 'react-toastify';

const CreateAdminModal = ({ isOpen, onClose }) => {
  const [createAdmin] = useCreateAdminMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN'
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }

      await createAdmin(formData).unwrap();
      toast.success('Admin created successfully');
      onClose();
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN'
      });
    } catch (error) {
      toast.error(error.data?.message || 'Failed to create admin');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Create New Admin</ModalHeader>
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
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
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
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateAdminModal; 