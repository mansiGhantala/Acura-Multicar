const yup = require('yup');

const contactSchema = yup.object({
  username: yup.string().required('Name is required').trim().min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email').trim(),
  phone: yup.string().required('Phone is required').matches(/^\+?\d{7,15}$/, 'Invalid phone number').trim(),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters').trim(),
});

module.exports = contactSchema;
