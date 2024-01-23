import * as validator from 'validator';

export const validateCreateGroup = (name: string): string[] => {
  const errors: string[] = [];

  if (!name) {
    errors.push('Group name is required');
  }

  if (!validator.isLength(name, { min: 3, max: 50 })) {
    errors.push('Group name must be between 3 and 50 characters');
  }

  return errors;
};

export const validateEditGroup = (groupId: number, newName: string): string[] => {
  const errors: string[] = [];

  if (!groupId || isNaN(groupId)) {
    errors.push('Invalid groupId');
  }

  if (!newName) {
    errors.push('New group name is required');
  }

  if (!validator.isLength(newName, { min: 3, max: 50 })) {
    errors.push('New group name must be between 3 and 50 characters');
  }

  return errors;
};

export const validateRemoveGroup = (groupId: number): string[] => {
  const errors: string[] = [];

  if (!groupId || isNaN(groupId)) {
    errors.push('Invalid groupId');
  }

  return errors;
};

export const validateAddUserToGroup = (userId: number, groupId: number): string[] => {
  const errors: string[] = [];

  if (!userId || isNaN(userId)) {
    errors.push('Invalid userId');
  }

  if (!groupId || isNaN(groupId)) {
    errors.push('Invalid groupId');
  }

  return errors;
};

export const validateRemoveUserFromGroup = (userId: number, groupId: number): string[] => {
  const errors: string[] = [];

  if (!userId || isNaN(userId)) {
    errors.push('Invalid userId');
  }

  if (!groupId || isNaN(groupId)) {
    errors.push('Invalid groupId');
  }

  return errors;
};