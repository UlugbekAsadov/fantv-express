import { check } from 'express-validator';

export const validateRegister = () => {
  return [
    check('username')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    check('password')
      .isString()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('phoneNumber')
      .isMobilePhone('any')
      .withMessage('Phone number must be valid'),
    check('fullName')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Full name is required'),
  ];
};

export const validateLogin = () => {
  return [
    check('phoneNumber')
      .isLength({ min: 13 })
      .withMessage('Phone must be at least 13 characters long'),
    check('password')
      .isString()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ];
};

export const validateChangePassword = () => {
  return [
    check('password')
      .isString()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    check('confirmPassword')
      .isString()
      .isLength({ min: 6 })
      .withMessage('Confirm password must be at least 6 characters long'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ];
};
