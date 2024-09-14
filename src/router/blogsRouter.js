import express from 'express';
import upload from '../middleware/membercloud.js';
import BlogsController from '../controller/blogController.js';




const router = express.Router();

router.post('/', upload.single('blogImage'),BlogsController.createBlogs);
router.get('/',BlogsController.viewBlogs);
router.get('/:id', BlogsController.viewBlog);
router.delete('/:id', BlogsController.deleteBlog);
router.put('/:id',BlogsController.updateBlog);

export default router;