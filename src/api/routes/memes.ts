import express from 'express';
import { validateQueryParams, validateBody } from '../middlewares/validator';
import { paginatedQuerySchema } from './validation-schemas/paginationSchemas';
import {
  createPayloadSchema,
  updatePayloadSchema,
} from './validation-schemas/memeSchemas';
import {
  getAllPaginated,
  createMeme,
  getMemeById,
  updateMeme,
  deleteMeme,
} from '../controllers/memesController';

const router = express.Router();

router.get('/', validateQueryParams(paginatedQuerySchema), getAllPaginated);
router.post('/', validateBody(createPayloadSchema), createMeme);
router.get('/:memeId', getMemeById);
router.put('/:memeId', validateBody(updatePayloadSchema), updateMeme);
router.delete('/:memeId', deleteMeme);

// router.post('/find');

export default router;
