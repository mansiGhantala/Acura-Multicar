import React, { useState, useRef } from 'react';
import api from '../api/api';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Contact = ({ isLoggedIn = false, defaultName = '', defaultEmail = '', defaultPhone = '' }) => {
  const [formData, setFormData] = useState({
    username: defaultName,
    email: defaultEmail,
    phone: defaultPhone,
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const form = useRef(null);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGlobalMessage({ type: '', text: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone)) newErrors.phone = 'Enter valid phone';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const sendEmail = async (e) => {
  e.preventDefault();
  setGlobalMessage({ type: '', text: '' });

  if (!validate()) return;

  setLoading(true);
  try {
    await api.post('/form/contact', formData);
    setGlobalMessage({ type: 'success', text: 'Message sent successfully!' });
    setFormData({ username: '', email: '', phone: '', message: '' });
    form.current.reset();
  } catch (error) {
    setGlobalMessage({ type: 'error', text: ' Failed to send message. Please try again.' });
    console.error(error?.response?.data || error.message);
  } finally {
    setLoading(false);
    setTimeout(() => {
      setGlobalMessage({ type: '', text: '' });
    }, 4000);
  }
};
  

  return (
    <div className="bg-[#F9FBFE] min-h-screen flex flex-col md:flex-row gap-8 p-6 sm:p-10">

      <div className="w-full md:w-1/2 flex flex-col gap-6 bg-[#D0E1F5] p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#415D8A]">Get in Touch</h2>
        <p className="text-[#415D8A]">We'd love to hear from you! Reach out with any questions.</p>

        <div className="flex flex-col gap-4 text-[#415D8A]">
          <div>
            <h4 className="font-semibold">Phone</h4>
            <p>+91 9687553179</p>
          </div>
          <div>
            <h4 className="font-semibold">Email</h4>
            <p>amansolutions24@gmail.com</p>
          </div>
          <div>
            <h4 className="font-semibold">Address</h4>
            <p>Acura Muticar,near Fountain hotel canal road - Surat, Gujarat, India  </p>
          </div>
          <div className="flex gap-4 mt-2 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ABBCDA]"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ABBCDA]"><FaInstagram /></a>
             </div>
        </div>
      <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.5199103916225!2d72.89638057445538!3d21.211222381488184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0457558a6995d%3A0x71cb14665870775a!2sAcura%20Multi%20Car%20Workshop!5e0!3m2!1sen!2sin!4v1753424200907!5m2!1sen!2sin"
  width="100%"
  height="200"
  allowFullScreen
  loading="lazy"
  className="rounded-lg"
/>
      </div>

      <form ref={form} onSubmit={sendEmail} className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-[#415D8A] mb-2">Contact us</h2>

        {globalMessage.text && (
          <p className={`text-sm font-medium p-3 rounded text-center ${
            globalMessage.type === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
          }`}>
            {globalMessage.text}
          </p>
        )}

        <input
          name="username"
          placeholder="Your Name"
          value={formData.username}
          onChange={onChange}
          readOnly={isLoggedIn}
          required
          className={`w-full border ${errors.username ? 'border-red-400' : 'border-[#ABBCDA]'} rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#415D8A] transition`}
        />
        {errors.username && <p className="text-red-500 text-sm -mt-2">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={onChange}
          readOnly={isLoggedIn}
          required
          className={`w-full border ${errors.email ? 'border-red-400' : 'border-[#ABBCDA]'} rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#415D8A] transition`}
        />
        {errors.email && <p className="text-red-500 text-sm -mt-2">{errors.email}</p>}

        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={onChange}
          readOnly={isLoggedIn}
          required
          className={`w-full border ${errors.phone ? 'border-red-400' : 'border-[#ABBCDA]'} rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#415D8A] transition`}
        />
        {errors.phone && <p className="text-red-500 text-sm -mt-2">{errors.phone}</p>}

        <textarea
          name="message"
          rows={5}
          placeholder="Your Message"
          value={formData.message}
          onChange={onChange}
          required
          className={`w-full border ${errors.message ? 'border-red-400' : 'border-[#ABBCDA]'} rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#415D8A] transition`}
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm -mt-2">{errors.message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-[#415D8A] hover:bg-[#ABBCDA] text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>

      </form>
    </div>
  );
};

export default Contact;
