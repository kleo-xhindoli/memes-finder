import express from 'express';
import { validateQueryParams, validateBody } from '../middlewares/validator';
import { paginatedQuerySchema } from './validation-schemas/paginationSchemas';
import {
  createPayloadSchema,
  updatePayloadSchema,
  searchQuerySchema,
} from './validation-schemas/memeSchemas';
import {
  getAllPaginated,
  createMeme,
  getMemeById,
  updateMeme,
  deleteMeme,
  searchMeme,
} from '../controllers/memesController';

const router = express.Router();

router.get('/', validateQueryParams(paginatedQuerySchema), getAllPaginated);
router.post('/', validateBody(createPayloadSchema), createMeme);
router.get('/search', validateQueryParams(searchQuerySchema), searchMeme);
router.get('/:memeId', getMemeById);
router.put('/:memeId', validateBody(updatePayloadSchema), updateMeme);
router.delete('/:memeId', deleteMeme);

export default router;
