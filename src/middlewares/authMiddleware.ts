import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import AppDataSource from '../db';
import { User } from '../entities/User';

export const verifyToken = (req: any, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Unauthorized - Token missing' });
    return;
  }
  console.log(token)

  jwt.verify(token, 'chatapp', async (err:any, decoded:any) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
      return;
    }
    const user = await AppDataSource.getRepository(User).findOneBy({username:decoded.username})
    req.user = user; 
    next();
  });
};