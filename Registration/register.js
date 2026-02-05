let form=document.querySelector('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let user=document.getElementById('user').value.trim();
    let pass=document.getElementById('pass').value.trim();
    let cpass=document.getElementById('cpass').value.trim();
    let mail=document.getElementById('mail').value.trim();
    let num=document.getElementById('num').value.trim();

    let valid=true;

    let usererror=document.getElementById('uerror');
    let perror=document.getElementById('perror');
    let cperror=document.getElementById('cperror');
    let merror=document.getElementById('merror');
    let nerror=document.getElementById('nerror');

    usererror.textContent="";
    perror.textContent="";
    cperror.textContent="";
    merror.textContent="";
    nerror.textContent="";

    let username=/^[A-Z][a-zA-Z0-9]{3,15}$/;
    if(!user)
    {
        usererror.textContent="Cannot be empty!!!";
        valid=false;
    }
    else if(!username.test(user))
    {
        usererror.textContent="Invalid character length!!!";
        valid=false;
    }

    let password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if(!pass)
    {
        perror.textContent="Password cannot be empty!!!"
        valid=false;
    }
    else if(!password.test(pass))
    {
        perror.textContent="Invalid password!!!"
        valid = false;
    }

    let cpassword=cpass.trim();
    if(!cpass)
    {
        cperror.textContent="Cannot be empty!!!"
        valid = false
    }
    else if(cpassword!==pass)
    {
        cperror.textContent="Password is not matching!!!"
        valid = false
    }

    let email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!mail)
    {
        merror.textContent="Email cannot be empty!!!"
        valid = false
    }
    else if(!email.test(mail))
    {
        merror.textContent="Invalid email!!!"
        valid = false
    }

    let number = /^[\d]{10}%/
    if(!num)
    {
        nerror.textContent="Cannot be empty!!!"
        valid = false
    }
    else if(number.test(num))
    {
        nerror.textContent="Invalid input!!!"
        valid = false
    }

    if(valid)
    {
        const register = {
            username:user,
            password:pass,
            cpassword:cpass,
            mail:mail,
            num:num
        }
        localStorage.setItem('register', JSON.stringify(register));
        alert('registration is successful')
        location.href="../Login/login.html"
        form.reset()
    }
})
