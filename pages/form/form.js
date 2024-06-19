 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getDatabase, set, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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



var imgUrl = document.getElementById('imgUrl');
var carName = document.getElementById('carName');
var company = document.getElementById('company');
var price = document.getElementById('price');
var model = document.getElementById('model');



window.addData = function() {
    if(imgUrl.value && carName.value && company.value && price.value && model){
        var obj = {
            imgUrl: imgUrl.value,
            carName: carName.value,
            company: company.value,
            price: price.value,
            model: model.value
        };
     
    
        imgUrl.value = ''
        carName.value = ''
        company.value = ''
        price.value = ''
        model.value = ''
    
        obj.id = push(ref(db, "Details")).key
    
        var reference = ref(db, `Details/${obj.id}`);
        set(reference,obj)
    
        .then(function (){
            console.log("Succesfully");
            Swal.fire({
                title: "Thanks your product added!",
                text: "You have successfully!",
                icon: "success"
            });
        })
    
        .catch(function (err) {
            console.log(err.message);
        })
    }
else{
      Swal.fire({
            title: "All field required!",
            // text: "You have successfully signed up!",
            // icon: "success"
        });
}
  
}