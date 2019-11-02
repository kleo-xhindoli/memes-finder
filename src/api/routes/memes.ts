import express from 'express';
import { validateQueryParams, validateBody } from '../middlewares/validator';
import auth from '../middlewares/auth';
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
router.post('/', auth, validateBody(createPayloadSchema), createMeme);
router.get('/search', validateQueryParams(searchQuerySchema), searchMeme);
router.get('/:memeId', getMemeById);
router.put('/:memeId', auth, validateBody(updatePayloadSchema), updateMeme);
router.delete('/:memeId', auth, deleteMeme);

export default router;
