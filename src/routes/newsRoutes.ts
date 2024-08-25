import express from 'express';
import newsController from '../controller/newsController';
import upload from '../middleware/cloudinary';

const router = express.Router();

router.post('/', upload.single('newsImage'), newsController.postNews);
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getOneNews);
router.delete('/:id', newsController.deleteOneNews);
router.delete('/', newsController.deleteNews);
router.put('/:id', newsController.updateNews);

export default router;

