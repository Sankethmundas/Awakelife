/* ============================================
   AWAKELIFE COACHING — Form Handlers
   ============================================ */

import { db, collection, addDoc, serverTimestamp } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('cf-name')?.value || '',
        email: document.getElementById('cf-email')?.value || '',
        phone: document.getElementById('cf-phone')?.value || '',
        service: document.getElementById('cf-service')?.value || '',
        message: document.getElementById('cf-message')?.value || '',
        timestamp: new Date().toISOString()
      };
      // Save to Firebase Firestore
      try {
        if (!db) throw new Error("Firebase DB not initialized.");
        await addDoc(collection(db, 'contacts'), {
          ...data,
          createdAt: serverTimestamp()
        });
        showToast('Thank you! Nivedita will reach out to you within 24 hours. 🌟', 'success');
        contactForm.reset();
      } catch (error) {
        console.error("Error saving contact form: ", error);
        showToast('Something went wrong. Please check your Firebase config or try again later.', 'error');
      }
      showToast('Thank you! Nivedita will reach out to you within 24 hours. 🌟', 'success');
      contactForm.reset();
    });
  }

  // ---- Newsletter Form ----
  const nlForms = document.querySelectorAll('.newsletter-form');
  nlForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]')?.value || '';
      if (!email) return;
      
      try {
        if (!db) throw new Error("Firebase DB not initialized.");
        await addDoc(collection(db, 'newsletter'), {
          email: email,
          timestamp: new Date().toISOString(),
          createdAt: serverTimestamp()
        });
        showToast('Welcome to the AwakeLife community! 🎉', 'success');
        form.reset();
      } catch (error) {
        console.error("Error saving newsletter signup: ", error);
        showToast('Something went wrong. Please check your connection.', 'error');
      }
    });
  });

  // ---- Booking Form (CTA section) ----
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('bf-name')?.value || '',
        email: document.getElementById('bf-email')?.value || '',
        phone: document.getElementById('bf-phone')?.value || '',
        service: document.getElementById('bf-service')?.value || '',
        preferredDate: document.getElementById('bf-date')?.value || '',
        message: document.getElementById('bf-message')?.value || '',
        timestamp: new Date().toISOString()
      };
      
      try {
        if (!db) throw new Error("Firebase DB not initialized.");
        await addDoc(collection(db, 'bookings'), {
          ...data,
          createdAt: serverTimestamp()
        });
        showToast('Session booking received! Nivedita will confirm your slot within 24 hours. ✨', 'success');
        bookingForm.reset();
      } catch (error) {
        console.error("Error saving booking form: ", error);
        showToast('Something went wrong with the booking. Please check Firebase config.', 'error');
      }
    });
  }
});
