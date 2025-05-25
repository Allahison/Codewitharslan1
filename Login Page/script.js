// ✅ Firebase Configuration (Replace if needed)
const firebaseConfig = {
  apiKey: "AIzaSyC6iFt1qbLbuUPgwR9anqowlf29hk2a5p0",
  authDomain: "assignment-5dc41.firebaseapp.com",
  projectId: "assignment-5dc41",
  storageBucket: "assignment-5dc41.appspot.com",
  messagingSenderId: "657312128928",
  appId: "1:657312128928:web:4f680f949944979c610ec5",
  measurementId: "G-FHX5GH5TK3"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Signup function
function signUp() {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful. Please log in now.");
      window.location.href = "../Login Page/Login Page.html"; // ✅ Adjusted path if needed
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// ✅ Login function
function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "../Welcome Page/welcome.html"; // ✅ Adjust this path to match folder structure
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}
