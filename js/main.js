



let booksArray=[];
let siteName=document.getElementById('name');
let siteUrl=document.getElementById('url');
let btnSubmit=document.getElementById('btnSubmit')
let btnUpdate=document.getElementById('btnUpdate')
let indexUpdate=0;
if(localStorage.getItem('books')!=null){
    booksArray=JSON.parse(localStorage.getItem('books'))
    displayInfo();
}


function getBooks(){
        let Books={
            name:siteName.value,
            url:siteUrl.value,
        }
        booksArray.unshift(Books);
    
    displayInfo();
}

function displayInfo(){
    let str=``;
    for(let i=0;i<booksArray.length;i++){
        
        str+=`
            <tr>
                <td>${i+1}</td>
                <td>${booksArray[i].name}</td>
                <td><button class="btn btn-success" onclick="visiteurl()"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button class="btn btn-info text-white"  onclick="setFormForUpdate(${i})">Update</button></td>

                <td><button class="btn btn-danger" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
        `
    }
    document.getElementById('demo').innerHTML=str;
    localStorage.setItem('books',JSON.stringify(booksArray))
    clearbooks()
}
function deleteBook(index){
    booksArray.splice(index,1);
    localStorage.setItem('books',JSON.stringify(booksArray))
    displayInfo();
}
function searchBooks(Search){
    let str2=``
    for(let i=0;i<booksArray.length;i++){
        if(booksArray[i].name.toLowerCase().includes(Search.toLowerCase()) ){
            str2+=`
            <tr>
                <td>${i+1}</td>
                <td>${booksArray[i].name.replace(Search,`<span>${Search}</span>`)}</td>
                <td><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button class="btn btn-info text-white ">Update</button></td>

                <td><button class="btn btn-danger" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>
        `
    }
    document.getElementById('demo').innerHTML=str2;
    localStorage.setItem('books',JSON.stringify(booksArray)) 
    }
}
function clearbooks(){
    siteName.value="";
    siteUrl.value="";
}
function setFormForUpdate(index){
    indexUpdate=index
    btnSubmit.classList.replace('d-block' , 'd-none');
    btnUpdate.classList.replace('d-none' , 'd-block');
    siteName.value=booksArray[index].name;
    siteUrl.value=booksArray[index].url;
}
function updateProduct(){
    let Books={
        name:siteName.value,
        url:siteUrl.value,
    }
    booksArray.splice(indexUpdate,1,Books);
    localStorage.setItem('books',JSON.stringify(booksArray))

    displayInfo();
    btnSubmit.classList.replace('d-none' , 'd-block');
    btnUpdate.classList.replace('d-block' , 'd-none');

}

let nameRegex=/^[A-za-z_]{2,}$/
function isNameValid(){
    if(nameRegex.test(siteName.value)){
        return true;
    }
    else{
        return false
    }
}
let urlRegex=/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/
function isUrlValid(){
    if(urlRegex.test(siteUrl.value)){
        return true;
    }
    else{
        return false
    }
}
siteName.onkeyup=function(){
    if(isNameValid() && isUrlValid()){
        btnSubmit.removeAttribute('disabled')
    }
    else{
        btnSubmit.disabled="true";
    }
}
siteUrl.onkeyup=function(){
    if(isNameValid() && isUrlValid()){
        btnSubmit.removeAttribute('disabled')
    }
    else{
        btnSubmit.disabled="true";
    }
}
function visiteurl(){
    for(var i=0;i<booksArray.length;i++){
        window.open(booksArray[i].url)
    }   
}