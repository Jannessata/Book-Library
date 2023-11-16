let bookName = document.getElementById('new_book');
let authorOfTheBook = document.getElementById('new_author');
let numberOfPages = document.getElementById('choose_pages');
let submitButton = document.getElementById('submit');
let statusButton = document.getElementById('status');
let table = document.querySelector(".table");
let x = document.getElementById("x-icon");
let totalBooks = document.querySelector('.total-books-number');

myLibrary = [];

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let newBook = new Book(bookName.value, authorOfTheBook.value, numberOfPages.value, statusButton.innerHTML);
    myLibrary.push(newBook);    
    console.log(myLibrary);
    clearSearch();
    printBooks();
})

class Book{

    constructor(name, author, pages, status){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this['data-index'] = myLibrary.length;
    }
   
}

const printBooks = () => {
    table.innerHTML = "";

    myLibrary.forEach((e,index) => {
        let statusClass = e.status === "READ" ? "read-status" : "unread-status";

        let html = `
        <table class="table">
        <tr class = "newRow">
        <td class="name">${e.name}</td> 
        <td class="author">${e.author}</td> 
        <td class="pages">${e.pages}</td> 
        <td class="stat"><button class ="status-btn ${statusClass}" id="change-status-btn-${index}" onclick="changeStatus(${index})">${e.status}</button></td>
        <td class="delete"><button class="delete-btn" type="button" id="delete-btn-${index}"  onclick="deleteRow(this)">${'Delete'}</button></td>
      
    </tr>
    </table>
    `;
        table.innerHTML += html;
      }); 

      totalBooks.innerHTML = myLibrary.length;
}

printBooks();

statusButton.addEventListener('click', () =>{   
    if(statusButton.classList == 'read'){
       setUnread(statusButton);
    }else{
        setRead(statusButton);
    }
})

const setUnread = (x) => {
    x.classList.add('unread');
    x.classList.remove('read');
    x.innerText = 'UNREAD';
}

const setRead = (x) => {
    x.classList.remove('unread');
    x.classList.add('read');
    x.innerText = 'READ';
}

function clearSearch() {
    bookName.value = '';
    authorOfTheBook.value = '';
    numberOfPages.value = '';
    setRead(statusButton);
  }

let deleteBtn = document.getElementById("delete-btn");

function deleteRow(button) {
    const tr = button.parentNode.parentNode;
    const index = tr.parentNode.parentNode.getAttribute('data-index');
  
    tr.parentNode.removeChild(tr);
    myLibrary.splice(index, 1);

    const currentCount = parseInt(totalBooks.textContent);
    totalBooks.textContent = currentCount - 1;

}

function changeStatus(index){
     const button = document.getElementById(`change-status-btn-${index}`);
     if(button.innerText == 'READ'){
        button.innerText = 'UNREAD';
        button.classList.add('unread-status');
        button.classList.remove('read-status');
    
     }else if (button.innerText == 'UNREAD'){
        button.innerText = 'READ';
        button.classList.remove('unread-status');
        button.classList.add('read-status');
     }
}








  