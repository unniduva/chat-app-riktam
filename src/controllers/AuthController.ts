import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';
import { validateSignup, validateLogin } from '../dto/AuthDTO';

const userService = new UserService();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const validationErrors = validateSignup({ username, password });

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await userService.findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ error: 'Username already taken' });
      return;
    }

  const result =  await userService.createUser(username, hashedPassword);
  delete result.password
    res.json({ message: 'User registered successfully',data:result });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const validationErrors = validateLogin({ username, password });

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
    return;
  }

  try {
    const user = await userService.findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ username }, 'chatapp', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};