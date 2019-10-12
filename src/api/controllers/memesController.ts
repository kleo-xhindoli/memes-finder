import { NextFn, MemeInput, PaginationInput } from '../../types';
import { Response } from 'express';
import MemeService from '../../services/Meme.service';
import Boom from 'boom';

export async function getAllPaginated(req: any, res: Response, next: NextFn) {
  const {
    page,
    size,
    sort,
    sortDirection,
  } = req.validatedQueryParams as PaginationInput;
  try {
    const result = await MemeService.getPaginated(
      parseInt(size),
      parseInt(page),
      sort,
      sortDirection
    );
    res.json(result);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}

export async function createMeme(req: any, res: Response, next: NextFn) {
  const memeInput = req.validatedBody as MemeInput;

  try {
    const created = await MemeService.create(memeInput);
    const response = MemeService.toResponseObject(created);
    res.json(response);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}
