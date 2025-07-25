const Contact = require('../models/contact-model');
const contactSchema = require('../middleware/contact-validation');

const contactForm = async (req, res) => {
  try {
    await contactSchema.validate(req.body);

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: 'Message submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
  res.json({ success: true, message: 'Deleted successfully' });
};

const markMessageAsRead = async (req, res) => {
  const { id } = req.params;
  const updated = await Contact.findByIdAndUpdate(id, { read: true }, { new: true });
  res.json({ success: true, data: updated });
};

module.exports = {markMessageAsRead,deleteContact,getAllContacts,contactForm}