// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

var firebase = require("firebase");
var firebaseui = require("firebaseui");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4_MUZfdcUUQFKTBRrVxF2ryc19wT0uwU",
  authDomain: "library-project-b6ecd.firebaseapp.com",
  projectId: "library-project-b6ecd",
  storageBucket: "library-project-b6ecd.appspot.com",
  messagingSenderId: "487476011043",
  appId: "1:487476011043:web:5af4db3975b04b5bb61196",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
  ],
  // Other config options...
});

// Is there an email link sign-in?
if (ui.isPendingRedirect()) {
  ui.start("#firebaseui-auth-container", uiConfig);
}
// This can also be done via:
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  ui.start("#firebaseui-auth-container", uiConfig);
}

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "localhost:5500/src/index.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

ui.start("#firebaseui-auth-container", uiConfig);

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });

const books = document.querySelector(".books");
const title1 = document.getElementById("title");
const author1 = document.getElementsByName("author")[0];
const pages1 = document.getElementsByName("pages")[0];
const check1 = document.getElementById("read1");
const check2 = document.getElementById("read2");
const formInput = document.getElementById("formInput");
const btn = document.querySelector("#readInfo");
const headerSpan = document.querySelector("header--span");

headerSpan.addEventListener("click");
// test javascript is hooked up properly to html
console.log("test");

// event listener for click on submit button on form
formInput.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary();
  resetForm();
  refreshBooks();
  createBook(myLibrary);
});

// array that book objects is pushed to
let myLibrary = [];

// constructor for book objects
/*function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
} */
// class constructor for book objects
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// function that checks to see which checkbox was selected, and returns that value
let checkedValue = function () {
  if (check1.checked === true) {
    return check1.value;
  } else {
    return check2.value;
  }
};

// adds book to array
function addBookToLibrary() {
  let newBook = new Book(
    title1.value,
    author1.value,
    pages1.value,
    checkedValue()
  );
  myLibrary.push(newBook);
  libraryStorage();
}

// set protoype
addBookToLibrary.prototype = Object.create(Book.prototype);

// creates the book on page and routes info to proper elements
function createBook(array) {
  for (let i = 0; i < array.length; i++) {
    let createBook = document.createElement("div");
    createBook.classList.add("newBook");
    books.appendChild(createBook);

    let createSpanTitle = document.createElement("span");
    createSpanTitle.classList.add("bookInfo");
    createSpanTitle.textContent = "Title: " + array[i].title;
    createBook.appendChild(createSpanTitle);

    let createSpanAuthor = document.createElement("span");
    createSpanAuthor.classList.add("bookInfo");
    createSpanAuthor.textContent = "Author: " + array[i].author;
    createBook.appendChild(createSpanAuthor);

    let createSpanPages = document.createElement("span");
    createSpanPages.classList.add("bookInfo");
    createSpanPages.textContent = "Pages: " + array[i].pages;
    createBook.appendChild(createSpanPages);

    let createButtonRead = document.createElement("button");
    createButtonRead.textContent = "Read: " + array[i].read;

    if (createButtonRead.textContent === "Read: Yes") {
      createButtonRead.classList.add("greenButton");
    } else if ((createButtonRead.textContent = "Read: No")) {
      createButtonRead.classList.add("redButton");
    }
    createButtonRead.setAttribute("datatext", i);

    createBook.appendChild(createButtonRead);

    let createButton = document.createElement("button");
    createButton.classList.add("remove");
    createButton.innerText = "Remove";
    createButton.setAttribute("dataindex", i);
    createBook.appendChild(createButton);
  }
}

// refreshes books shown on page
function refreshBooks() {
  let refreshBooks = document
    .querySelectorAll(".newBook")
    .forEach((e) => e.remove());
  return refreshBooks;
}

const formTable = document.querySelector("#form");

// resets form upon each submit
function resetForm() {
  return formInput.reset();
}

// add event listener to buttons
books.addEventListener("click", (e) => {
  if (!e.target.matches("button")) {
    return;
  } else if (e.target.classList.contains("remove")) {
    myLibrary.splice(e.target.getAttribute("dataindex"), 1);
    refreshBooks();
    createBook(myLibrary);
    libraryStorage();

    console.log(myLibrary);
    console.log(e.target);
  } else if (e.target.classList.contains("greenButton")) {
    e.target.textContent = "Read: No";
    e.target.className = "redButton";
    myLibrary[e.target.getAttribute("datatext")].read = "No";
    libraryStorage();

    console.log(e.target);
  } else if (e.target.classList.contains("redButton")) {
    e.target.textContent = "Read: Yes";
    e.target.className = "greenButton";
    myLibrary[e.target.getAttribute("datatext")].read = "Yes";
    let storedLibrary = JSON.stringify(myLibrary);
    localStorage.setItem("library", storedLibrary);

    console.log(e.target);
  } else console.log(e.target);
});

// prevents form resubmission from appearing
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// checks to see if localstorage is available has room
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// returns value regarding local storage compatability
if (storageAvailable("localStorage")) {
  console.log("yes");
} else {
  console.log("no");
}

// checks to see on page load, if local storage exists from prior session, if it does, loads user data
function onStartUp() {
  if (localStorage.length === 0 || localStorage.getItem("library") == "[]") {
    localStorage.removeItem("library");
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem("library"));
    createBook(myLibrary);
  }
}

function libraryStorage() {
  let storedLibrary = JSON.stringify(myLibrary);
  localStorage.setItem("library", storedLibrary);
}

title1.addEventListener("input", () => {
  if (title1.validity.tooShort) {
    title1.setCustomValidity("I am expecting a longer title");
  } else {
    title1.setCustomValidity("");
  }
});

onStartUp();
