import { Request, Response } from 'express';
import { GroupService } from '../services/GroupService';
import * as groupDto from '../dto/GroupDTO';

const groupService = new GroupService();

export const createGroup = async (req: any, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const user = req.user
    const validationErrors = groupDto.validateCreateGroup(name);
    if (validationErrors.length > 0) {
      res.status(400).json({ errors: validationErrors });
      return;
    }

   const result= await groupService.createGroup(name,user.id);
    res.json({ message: 'Group created successfully',data:result });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const editGroup = async (req: any, res: Response): Promise<void> => {
  try {
    const { groupId, name } = req.body;
    const user = req.user

    const validationErrors = groupDto.validateEditGroup(groupId,name);

    if (validationErrors.length > 0) {
      res.status(400).json({ errors: validationErrors });
      return;
    }

    const group = await groupService.findGroupById(groupId);

    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }
    if(group.groupAdmin.id !== user.id){
      res.status(403).json({ message: "Permission denied! only group admin can change group name" });
      return
    }

    const result = await groupService.editGroup(group, name);
    res.json({ message: 'Group edited successfully',data:result });
  } catch (error) {
    console.error('Error editing group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeGroup = async (req: any, res: Response): Promise<void> => {
  try {
    const { groupId } = req.params;
    const user = req.user

    const validationErrors = groupDto.validateRemoveGroup(Number(groupId));

    if (validationErrors.length > 0) {
      res.status(400).json({ errors: validationErrors });
      return;
    }

    const group = await groupService.findGroupById(Number(groupId));
    if(group!==null && group.groupAdmin.id !== user.id){
      res.status(403).json({ message: "Permission denied! only group admin can remove/delete group" });
      return
    }
    if (!group) {
      res.status(404).json({ error: 'Group not found' });
      return;
    }

    await groupService.removeGroup(group);
    res.json({ message: 'Group removed successfully' });
  } catch (error) {
    console.error('Error removing group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listMyGroups = async (req: any, res: Response): Promise<void> => {
  try {
    const user =req.user
   const result= await groupService.findUserById(user.id);
    res.json({ data:result });
  } catch (error:any) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: error.message||'Internal Server Error' });
  }
};

export const addUserToGroup = async (req: any, res: Response): Promise<void> => {
  try {
    const { userId, groupId } = req.body;
    const user = req.user
    const validationErrors = groupDto.validateAddUserToGroup(userId, groupId);

    if (validationErrors.length > 0) {
      res.status(400).json({ errors: validationErrors });
      return;
    }


    const group = await groupService.findGroupById(groupId);
    const targetUser = await groupService.findUserById(userId);

    if(group!==null && group.groupAdmin.id !== user.id){
      res.status(403).json({ message: "Permission denied! only group admin can add users to group" });
      return
    }

    if (!group || !targetUser) {
      res.status(404).json({ error: 'Group or user not found' });
      return;
    }

    const result = await groupService.addUserToGroup(targetUser, group);
    res.json({ message: 'User added to group successfully',data:result });
  } catch (error:any) {
    console.error('Error adding user to group:', error);
    res.status(500).json({ error: error.message ? error.message : 'Internal Server Error' });
  }
};

export const removeUserFromGroup = async (req: any, res: Response): Promise<void> => {
  try {
    const { userId, groupId } = req.body;
    const user = req.user;

    const validationErrors = groupDto.validateRemoveUserFromGroup(userId, groupId);

    if (validationErrors.length > 0) {
      res.status(400).json({ errors: validationErrors });
      return;
    }

    const group = await groupService.findGroupById(groupId);
    const targetUser = await groupService.findUserById(userId);


    if(group!==null && group.groupAdmin.id !== user.id){
      res.status(403).json({ message: "Permission denied! only group admin can remove users from group" });
      return
    }
    if (!group || !targetUser) {
      res.status(404).json({ error: 'Group or user not found' });
      return;
    }

    const result = await groupService.removeUserFromGroup(targetUser, group);
    res.json({ message: 'User removed from group successfully',data:result})
  }catch (error:any) {
    console.error('Error removing user fromrs group:', error);
    res.status(500).json({ error: error.message ? error.message : 'Internal Server Error' });
  }
}