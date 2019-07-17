//book   class        
class Book{
    constructor(title,author,isbn){
this.title  = title;
this.author = author;
this.isbn = isbn;
    }
}
//ui  class:handle ui task
class Ui{
    static displayBooks(){
       
        const books = Store.getBooks()
        books.forEach((book)=>Ui.addBooksToList(book))
    }

    static addBooksToList(book){
const List = document.querySelector('#book-list');
const row = document.createElement('tr');
row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>

`;
List.appendChild(row)
    }

    //deletbook
    static deletBook(el){
if(el.classList.contains('delete')){
el.parentElement.parentElement.remove()
}
    }
//show alert
    static showAlert(massage,className){
const div = document.createElement('div');
div.className = `alert alert-${className}`;
div.appendChild(document.createTextNode(massage))
const container = document.querySelector('.container');
const form = document.querySelector('#book-form');
container.insertBefore(div,form);
//vanishing 3 sec
setTimeout(()=>document.querySelector('.alert').remove(),3000)
    }
    //clear field
    static clearFiled(){
        document.querySelector('#title').value  = '';
        document.querySelector('#author').value  = '';
        document.querySelector('#isbn').value  = '';
    }
}
//store  class: handle storage
class Store {
   static getBooks(){
let books;
if(localStorage.getItem('books')=== null){
books =  [];
}else{
    books = JSON.parse(localStorage.getItem('books'));
}
return books;
    }
   static addBook (book){
const books = Store.getBooks();
books.push(book);
localStorage.setItem('books',JSON.stringify(books))
    }
   static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn  === isbn){
                books.splice(index,1)
            }
        })
localStorage.setItem('books',JSON.stringify(books));

    }
}
//event:display book list
document.addEventListener('DOMContentLoaded',Ui.displayBooks);
//event:add book
document.querySelector('#book-form').addEventListener('submit',(e)=>
{
    //prevent default
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const author  = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if(title==='' || author==='' || isbn ===''){
        Ui.showAlert('please enter valit info', 'danger')
    }else{
  //instatiate
  const book = new Book(title,author,isbn);

  //add book to ui
  Ui.addBooksToList(book);
  //add books to store
  Store.addBook(book);
  //success massage
  Ui.showAlert('book added', 'success');
  //clear fields
  Ui.clearFiled(book)
    }
  
})
//event:remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    //remove book from ui
    Ui.deletBook(e.target);
    //remove  book from store
    Store.removeBook
    (e.target.parentElement.previousElementSibling.textContent);
    //success massage
  Ui.showAlert('book removed', 'success');
})