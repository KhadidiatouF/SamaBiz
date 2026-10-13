import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ code: 'NOT_FOUND', message: `Route introuvable: ${req.method} ${req.path}` });
};
