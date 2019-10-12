import express from 'express';
import { validateQueryParams, validateBody } from '../middlewares/validator';
import { paginatedQuerySchema } from './validation-schemas/paginationSchemas';
import { createPayloadSchema } from './validation-schemas/memeSchemas';
import { getAllPaginated, createMeme } from '../controllers/memesController';

const router = express.Router();

router.get('/', validateQueryParams(paginatedQuerySchema), getAllPaginated);
router.post('/', validateBody(createPayloadSchema), createMeme);
// router.get('/:memeId');
// router.put('/:memeId');
// router.delete('/:memeId');

router.post('/find');

export default router;
