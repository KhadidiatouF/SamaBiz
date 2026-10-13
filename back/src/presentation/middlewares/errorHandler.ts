import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../domain/errors/AppError.js';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Donnees invalides',
      issues: error.issues,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ code: error.code, message: error.message });
  }

  console.error(error);
  return res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Erreur serveur' });
};
