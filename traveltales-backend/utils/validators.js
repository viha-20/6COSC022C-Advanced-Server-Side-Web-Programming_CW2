const { body } = require('express-validator');

const validateRegisterInput = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateLoginInput = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateBlogPostInput = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('country_name').notEmpty().withMessage('Country name is required'),
  body('date_of_visit').isDate().withMessage('Valid date is required')
];

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateBlogPostInput
};