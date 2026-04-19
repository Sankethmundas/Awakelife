import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyBmspLXihvJ1InMfqpGlcKTjS_ZD6RFo",
  authDomain: "awakelife-coaching.firebaseapp.com",
  projectId: "awakelife-coaching",
  storageBucket: "awakelife-coaching.firebasestorage.app",
  messagingSenderId: "144450781401",
  appId: "1:144450781401:web:c00d4ee326723335fcfec8"
};

let app, db;

try {
  // Initialize Firebase using the config
  app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed! Have you updated the firebaseConfig placeholder?", error);
}

// Export the db and helper functions so forms.js and chatbot.js can use them
export { db, collection, addDoc, serverTimestamp };
