 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
 const auth = getAuth();

const UserName = document.getElementById('UserName');
const email = document.getElementById('email');
const password = document.getElementById('password');

window.signupUser = function () {
    const obj = {
        UserName: UserName.value,
        email: email.value,
        password: password.value
    };

    if (!obj.UserName || !obj.email || !obj.password) {
        Swal.fire({
            title: "All fields are required!",
            text: "Please fill in all fields.",
            icon: "warning"
        });
        return; // Stop the function execution if any field is empty
    }

    // Clear input fields
    UserName.value = '';
    email.value = '';
    password.value = '';
    console.log(obj);

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {       
        console.log(res);
       
        Swal.fire({
            title: "Your account has been created!",
            text: "You have successfully signed up!",
            icon: "success"
        });
    })
    window.location.assign("./pages/product/product.html")
    .catch(function (err) {
        console.log(err.message);
        let errorMessage = err.message;

        // Handle different error codes
        if (err.code === 'auth/email-already-in-use') {
            errorMessage = "This email is already in use. Please use a different email.";
        } else if (err.code === 'auth/invalid-email') {
            errorMessage = "Invalid email. Please check your email format.";
        } else if (err.code === 'auth/weak-password') {
            errorMessage = "Weak password. Please enter a stronger password.";
        }

        Swal.fire({
            title: "Sign up error!",
            text: errorMessage,
            icon: "error"
        });
    });
};