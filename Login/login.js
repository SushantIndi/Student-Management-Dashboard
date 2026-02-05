let form=document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let loginUser=document.getElementById('user').value.trim();
    let loginPass=document.getElementById('pass').value.trim();

    let valid=true;

    let usererror=document.getElementById('uerror');
    let perror=document.getElementById('perror');

    usererror.textContent="";
    perror.textContent="";

    let usernamePattern=/^[A-Z][a-zA-Z0-9]{3,14}$/;
    if(!loginUser)
    {
        usererror.textContent="can not be empty";
        valid=false;
    }
    else if(!usernamePattern.test(loginUser))
    {
        usererror.textContent="characters must be upper case and numbers";
        valid=false;
    }

    let passwordPattern = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[&%$#@])[A-Za-z\d&%$#@]{8,15}$/;
    if(!loginPass)
    {
        perror.textContent="password can not be empty"
        valid=false;
    }
    else if(!passwordPattern.test(loginPass))
    {
        perror.textContent="password must be capital letter, number, special character"
        valid = false;
    }

    let stored = JSON.parse(localStorage.getItem('register'))
    if(!stored)
    {
        alert("user not exist")
    }
    else if (loginUser === stored.username && loginPass === stored.password) {
        alert("Login successful");
        location.href = "../Homepage/homepage.html";
    } 
    else {
        alert("Invalid username or password");
    }
})