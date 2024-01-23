import express from 'express';
import { createGroup, editGroup, removeGroup, addUserToGroup, removeUserFromGroup,listMyGroups } from '../controllers/GroupController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Middleware to verify JWT token
router.use(verifyToken);

router.post('/create', createGroup);
router.post('/edit', editGroup);
router.delete('/remove/:groupId', removeGroup);
router.post('/addUser', addUserToGroup);
router.post('/removeUser', removeUserFromGroup);
router.get('/listMyGroups',listMyGroups)

export default router;