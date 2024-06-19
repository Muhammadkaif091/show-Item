 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getDatabase, ref, set, onValue, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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


var showProduct = document.getElementById('showProduct');

var carsDetails;

function getData() {
    var reference = ref(db, "Details/");
    onValue(reference, function (dt) {
        carsDetails = dt.val();
        var arr = Object.values(carsDetails);
        // Clear previous content
        showProduct.innerHTML = '';

        for(var i = 0; i < arr.length; i++){
            showProduct.innerHTML += `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <img src="${arr[i].imgUrl}" class="card-img-top img-fluid" alt="${arr[i].carName}">
                        <div class="card-body">
                            <h5 class="card-title">${arr[i].carName}</h5>
                            <p class="card-text"><strong>Company:</strong> ${arr[i].company}</p>
                            <p class="card-text"><strong>Price:</strong> ${arr[i].price}</p>
                            <p class="card-text"><strong>Model:</strong> ${arr[i].model}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    });
}
getData();