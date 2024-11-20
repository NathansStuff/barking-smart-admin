'use client';

import React, { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useUserMutations } from '../hooks/useUserMutations';
import { EUserRole } from '../types/EUserRole';
import { UserWithId } from '../types/User';

interface UserManagementTableProps {
  initialUsers: UserWithId[];
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({ initialUsers }) => {
  const [userList, setUserList] = useState<UserWithId[]>(initialUsers);
  const { handleRoleUpdate, isMutating } = useUserMutations();

  const handleRoleChange = async (userId: string, newRole: EUserRole): Promise<void> => {
    const updatedUser = userList.find((user) => user._id.toString() === userId);
    if (updatedUser) {
      const success = await handleRoleUpdate(userId, newRole);
      if (success) {
        setUserList((prev) => prev.map((user) => (user._id.toString() === userId ? { ...user, role: newRole } : user)));
      }
    }
  };

  return (
    <Table className='min-w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='py-2'>Name</TableHead>
          <TableHead className='py-2'>Email</TableHead>
          <TableHead className='py-2'>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userList.map((user) => (
          <TableRow key={user._id.toString()}>
            <TableCell className='py-2'>{user.name}</TableCell>
            <TableCell className='py-2'>{user.email}</TableCell>
            <TableCell className='py-2'>
              <Select
                value={user.role}
                onValueChange={(value) => handleRoleChange(user._id.toString(), value as EUserRole)}
                disabled={isMutating}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(EUserRole).map((role) => (
                    <SelectItem
                      key={role}
                      value={role}
                    >
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserManagementTable;
