const {body,validationResult}= require('express-validator');

const createProductValidation=[
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

const updateProductValidation=[
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('description').optional().notEmpty().withMessage('Description is required'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
];

const validate=(req, res,next)=>{
  const errors=validationResult(req);
  if(errors.isEmpty()){
    return next();
  }
  const extractedErrors=errors.array().map(err => ({ [err.param]: err.msg }));
  return res.status(422).json({errors:extractedErrors });
};

module.exports={ createProductValidation, updateProductValidation, validate };
