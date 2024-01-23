import express from 'express';
import { createMessage, likeMessage, listMessagesByGroup } from '../controllers/MessageController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Middleware to verify JWT token
router.use(verifyToken);

// Define routes
router.post('/create', createMessage);
router.post('/like', likeMessage);
router.get('/listByGroup/:groupId', listMessagesByGroup);

export default router;