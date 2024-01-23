import express from 'express';
import { signup, login } from '../controllers/AuthController';

const router = express.Router();

// Define routes
router.post('/signup', signup);
router.post('/login', login);

export default router;