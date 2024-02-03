const express=require('express');
const router=express.Router();
const { body}=require('express-validator');
const productController=require('../controllers/productController');

//Validation middleware for createProduct route
const createProductValidation=[
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

//Validation middleware for updateProduct route
const updateProductValidation=[
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('description').optional().notEmpty().withMessage('Description is required'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
];

//POST /api/products
router.post('/products', createProductValidation, productController.createProduct);

//GET /api/products
router.get('/products', productController.getAllProducts);

//GET /api/products/:id
router.get('/products/:id', productController.getProductById);

//PUT /api/products/:id
router.put('/products/:id', updateProductValidation, productController.updateProduct);

//DELETE /api/products/:id
router.delete('/products/:id', productController.deleteProduct);

//GET /api/products/search?keyword=keyword
router.get('/products/search', productController.searchProducts);

module.exports = router;
