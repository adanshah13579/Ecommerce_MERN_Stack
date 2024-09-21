import express from 'express';
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from '../../controllers/common/feature-controller.js';

const router = express.Router();

// Route to add a feature image
router.post('/add', addFeatureImage);

// Route to get all feature images
router.get('/get', getFeatureImages);

// Route to delete a feature image by ID
router.delete('/delete/:id', deleteFeatureImage);

export default router;
