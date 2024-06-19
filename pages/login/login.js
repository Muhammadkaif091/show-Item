 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { set, push, ref, onValue, getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDye8qfGZAJ5Ps_k9Ay5cv2pIBQp0EYxdw",
   authDomain: "showitem-f76a6.firebaseapp.com",
   projectId: "showitem-f76a6",
   storageBucket: "showitem-f76a6.appspot.com",
   messagingSenderId: "141371674318",
   appId: "1:141371674318:web:fdcccd4c09fb475cdaca9f",
   measurementId: "G-QXZJ1VSSG9"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

// Get email and password input elements
var email = document.getElementById('email');
var password = document.getElementById('password');

// Login function
window.userLogin = function () {
  var obj = {
      email: email.value,
      password: password.value,
  }

  if (!obj.email || !obj.password) {
      Swal.fire({
          title: "All fields are required!",
          text: "Please fill in all fields.",
          icon: "warning"
      });
      return; // Stop the function execution if any field is empty
  }

  email.value = '';
  password.value = '';

  signInWithEmailAndPassword(auth, obj.email, obj.password)
  .then(function (res){
      console.log(res);
      Swal.fire({
          title: "You have logged in successfully!",
          text: "You clicked the button!",
          icon: "success"
      }).then(() => {
          window.location.assign("../product/product.html");
      });
  })
  .catch(function (err){
      console.log(err.message);
      Swal.fire({
          title: "Invalid Email and Password!",
          text: "Please check your credentials.",
          icon: "error"
      });
  });
}

// Check user authentication status on product.html
if (window.location.pathname.endsWith('/product/product.html')) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            Swal.fire({
                title: "Please log in first!",
                text: "You need to be logged in to access this page.",
                icon: "warning"
            }).then(() => {
                window.location.assign("../login/login.html");
            });
        }
    });
}

// Sign out button
const SignOutButton = document.querySelector('#SignOut');
if (SignOutButton) {
    SignOutButton.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
            console.log('User signed out');
            Swal.fire({
                title: "Signed Out",
                text: "You have successfully signed out.",
                icon: "success"
            }).then(() => {
                window.location.assign("../login/login.html");
            });
        }).catch((error) => {
            console.log('Error signing out:', error);
            Swal.fire({
                title: "Sign Out Error",
                text: "There was an issue signing you out. Please try again.",
                icon: "error"
            });
        });
    });
}