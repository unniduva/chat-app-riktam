import { Request, Response } from 'express';
import { MessageService } from '../services/MessageService';

const messageService = new MessageService();

export const createMessage = async (req: any, res: Response): Promise<void> => {
  try {
    const { groupId, content } = req.body;
    const senderId = req.user.id;

    await messageService.createMessage(groupId, senderId, content);

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const likeMessage = async (req: any, res: Response): Promise<void> => {
  try {
    const { messageId } = req.body;
    const userId = req.user.id;

    await messageService.likeMessage(messageId, userId);

    res.json({ message: 'Message liked successfully' });
  } catch (error) {
    console.error('Error liking message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const listMessagesByGroup = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupId = req.params.groupId;

    const messages = await messageService.listMessagesByGroup(Number(groupId));

    res.json(messages);
  } catch (error) {
    console.error('Error listing messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};