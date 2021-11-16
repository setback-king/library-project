const books = document.querySelector('.books');
const title1 = document.getElementById('title');
const author1 = document.getElementsByName('author')[0];
const pages1 = document.getElementsByName('pages')[0];
const check1 = document.getElementById('read1');
const check2 = document.getElementById('read2');
const formInput= document.getElementById('formInput');
const btn = document.querySelector('#readInfo');


// test javascript is hooked up properly to html
console.log("test")

// event listener for click on submit button on form
formInput.addEventListener('submit', (e) =>{
    e.preventDefault();

    addBookToLibrary();
    resetForm();
    refreshBooks();
    createBook(myLibrary);
    
})

// array that book objects is pushed to
let myLibrary = [];
 
// constructor for book objects 
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  
    
}

// function that checks to see which checkbox was selected, and returns that value 
let checkedValue = function () {
    if (check1.checked === true) {
        return check1.value;
    }
    else {
        return check2.value
    }
}

// adds book to array 
function addBookToLibrary() {
  let newBook = new Book(title1.value, author1.value, pages1.value, checkedValue());
  myLibrary.push(newBook);
 
  
} 

// set protoype 
addBookToLibrary.prototype = Object.create(Book.prototype);


// creates the book on page and routes info to proper elements 
function createBook(array) {
 for (let i = 0; i < array.length; i++) {
      
        let createBook = document.createElement('div');
        createBook.classList.add("newBook");
        books.appendChild(createBook);

        let createSpanTitle = document.createElement('span');
        createSpanTitle.classList.add('bookInfo');
        createSpanTitle.textContent = "Title: " + array[i].title;
        createBook.appendChild(createSpanTitle)

        let createSpanAuthor = document.createElement('span');
        createSpanAuthor.classList.add('bookInfo');
        createSpanAuthor.textContent = "Author: " + array[i].author;
        createBook.appendChild(createSpanAuthor)

        let createSpanPages = document.createElement('span');
        createSpanPages.classList.add('bookInfo');
        createSpanPages.textContent = "Pages: " + array[i].pages;
        createBook.appendChild(createSpanPages)

        let createButtonRead = document.createElement('button');
        createButtonRead.textContent = "Read: " + array[i].read;
        
        if (createButtonRead.textContent === "Read: Yes") {
            createButtonRead.classList.add('greenButton')
        }
        else if (createButtonRead.textContent = "Read: No") {
            createButtonRead.classList.add('redButton')
        }

        createBook.appendChild(createButtonRead)
     
        let createButton = document.createElement('button');
        createButton.classList.add('remove');
        createButton.innerText = "Remove";
        createButton.setAttribute("dataindex", i)
        createBook.appendChild(createButton);

    }
    
}



// refreshes books shown on page
function refreshBooks() {
    let refreshBooks = document.querySelectorAll(".newBook").forEach(e => e.remove());
    return refreshBooks;

}





const formTable = document.querySelector("#form");


// resets form upon each submit
function resetForm (){
    return formInput.reset();
}

// removes book from webpage 
function removeBook(array) {
    delete array[target.getAttribute('dataindex')];
}


// add event listener to buttons 
books.addEventListener('click', (e) => {
    if (!e.target.matches('button')) {
      return;
    }
      else if (e.target.classList.contains('remove')) {
        myLibrary.splice(e.target.getAttribute('dataindex'), 1)
        refreshBooks();
        createBook(myLibrary);
        console.log(myLibrary)
        console.log(e.target)
      }
      else if (e.target.classList.contains('greenButton')) {
          e.target.textContent = "Read: No";
          e.target.className = 'redButton';
          console.log(e.target)
      }
      else if (e.target.classList.contains('redButton')) {
          e.target.textContent = "Read: Yes";
          e.target.className = 'greenButton';
          
          console.log(e.target)
      }
   
      else console.log(e.target)
})
        
// prevents form resubmission from appearing 
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }