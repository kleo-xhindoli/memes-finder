import { NextFn, MemeInput, PaginationInput, Meme } from '../../types';
import { Response, Request } from 'express';
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
  try {
    const memeInput = req.validatedBody as MemeInput;

    const created = await MemeService.create(memeInput);
    const response = MemeService.toResponseObject(created);
    res.json(response);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}

export async function getMemeById(req: Request, res: Response, next: NextFn) {
  try {
    const { memeId } = req.params;
    if (!memeId) return next(Boom.badRequest('Invalid id'));

    const meme = await MemeService.getById(memeId);
    if (!meme) {
      return next(Boom.notFound(`Meme with id ${memeId} could not be found`));
    }

    const memeResponse = MemeService.toResponseObject(meme);
    res.json(memeResponse);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}

export async function updateMeme(req: any, res: Response, next: NextFn) {
  try {
    const { memeId } = req.params;
    if (!memeId) return next(Boom.notFound('Invalid id'));
    const updatedMemeInput = req.validatedBody as Partial<Meme>;

    const updated = await MemeService.updateById(memeId, updatedMemeInput);
    if (!updated) {
      return next(Boom.notFound(`Meme with id ${memeId} could not be found`));
    }

    const updatedResponse = MemeService.toResponseObject(updated);
    res.json(updatedResponse);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}

export async function deleteMeme(req: Request, res: Response, next: NextFn) {
  try {
    const { memeId } = req.params;
    if (!memeId) return next(Boom.notFound('Invalid id'));

    const deleted = await MemeService.deleteById(memeId);
    if (!deleted) {
      return next(Boom.notFound(`Meme with id ${memeId} could not be found`));
    }

    const deletedResponse = MemeService.toResponseObject(deleted);
    res.json(deletedResponse);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}

type SearchQueryParamsInput = PaginationInput & { query: string };

export async function searchMeme(req: any, res: Response, next: NextFn) {
  const {
    page,
    size,
    query,
  } = req.validatedQueryParams as SearchQueryParamsInput;
  try {
    const result = await MemeService.search(
      query,
      parseInt(size),
      parseInt(page)
    );
    res.json(result);
  } catch (e) {
    return next(Boom.badImplementation(e));
  }
}
