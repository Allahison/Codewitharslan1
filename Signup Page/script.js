// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC6iFt1qbLbuUPgwR9anqowlf29hk2a5p0",
  authDomain: "assignment-5dc41.firebaseapp.com",
  projectId: "assignment-5dc41",
  storageBucket: "assignment-5dc41.appspot.com",
  messagingSenderId: "657312128928",
  appId: "1:657312128928:web:4f680f949944979c610ec5",
  measurementId: "G-FHX5GH5TK3"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful. Please log in now.");
      // Redirect to login page after signup success
      window.location.href = "../Login Page/Login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      // Redirect to welcome page after login success
      window.location.href = "../Welcome Page/welcome.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}
