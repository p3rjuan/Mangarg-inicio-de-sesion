// login mangarg
export const registerForm = document.getElementById("formRegister");
const user = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const mainSection = document.getElementById("mainSection");
export const containerUser = document.getElementById("containerUser");

export let check1 = false; 
export let check2 = false;
export let check3 = false; 
export let check4 = false;

//log in

export const loginForm = document.getElementById("formLogin");
const validUsername = document.getElementById("validUsername");
const validPassword = document.getElementById("validPassword");

export let check5 = false;
export let check6 = false;

//log in

function checkInputs() {

    const userValue = user.value.trim(); 
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (userValue === "" || userValue.length <= 3) { 
        setErrorFor(user, "El usuario debe tener al menos 4 letras o simbolos");
    } else {
        setSuccessFor(user);
        check1 = true;
    }

    if (emailValue === "") {
        setErrorFor(email, "Debe ingresar un email");
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, "Email invalido");
    } else {
        setSuccessFor(email);
        check2 = true; 
    }

    if (passwordValue === "" || passwordValue.length <= 4) {
        setErrorFor(password, "La contraseña debe tener al menos 4 letras o simbolos"); //
    } else {
        setSuccessFor(password); 
        check3 = true;
    }

    if (password2Value === "") { 
        setErrorFor(password2, "Ingrese nuevamente la contraseña");
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "Las contraseñas no coinciden");
    } else {
        setSuccessFor(password2);
        check4 = true;
    }
}

function setErrorFor(input, message) { 
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error"; 
    small.innerText = message; 
}

function setSuccessFor(input) { 
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

function isEmail(email) { 
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function validRegisterForm() { 
    if (check1 == true && check2 == true && check3 == true && check4 == true) { 
        Swal.fire({ 
            title: 'el usuario' + user.value + ' a sido creado',
            showConfirmButton: false,
            timer: 1000
        })
        registerForm.classList.add("hiddeContent"); 
        loginForm.classList.remove("hiddeContent");
    }
}

//user already created

function checkLoginInput() { 
    const userValue = validUsername.value.trim();
    const passwordValue = validPassword.value.trim();

    if (userValue !== user.value) { 
        setErrorFor(validUsername, "Nombre de usuario incorrecto");
    } else {
        setSuccessFor(validUsername);
        check5 = true;
    }

    if (passwordValue !== password.value) {
        setErrorFor(validPassword, "Contraseña  incorrecta");
    } else {
        setSuccessFor(validPassword);
        check6 = true; 
    }
}

function validLoginForm() { 
    if (check5 == true && check6 == true) { 
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido ' + user.value + ' a Mangarg',
            showConfirmButton: false,
            timer: 1500
        })

        userStorageUpdate() 
        mainSection.classList.remove("hiddeContent");
        containerUser.classList.add("hiddeContent"); 
    }
}

// events and validations

function userEvents() { 
    registerForm.addEventListener("submit", e => {
        e.preventDefault(); 
        checkInputs(); 
        validRegisterForm(); 
    });

    loginForm.addEventListener("submit", e => { 
        e.preventDefault();
        checkLoginInput(); 
        validLoginForm();
        console.log(check5, check6); 
    });
}

// data storage

function userStorageUpdate() {
    let userJson = JSON.stringify(check5); // we convert to String
    let passJson = JSON.stringify(check6); // we convert to String

    localStorage.setItem("userName", userJson); // squirrel away
    localStorage.setItem("Password", passJson); // squirrel away
}

function getUserInfoFromStorage() { 

    let userJson = localStorage.getItem("userName"); // we get the key entered
    let passJson = localStorage.getItem("Password"); // we get the key entered

    check5 = JSON.parse(userJson);
    check6 = JSON.parse(passJson);
}

function loginStorageValidation() { //* we check the data
    if (check5 === true || check6 === true) {
        mainSection.classList.remove("hiddeContent"); 
        containerUser.classList.add("hiddeContent");
    }
}

export function restartStorage() { 
    check1 = false
    check2 = false
    check3 = false 
    check4 = false
    check5 = false
    check6 = false
    setErrorFor(user, "Ingrese un usuario");
    setErrorFor(email, "Ingrese un email");
    setErrorFor(password, "Ingrese una contraseña");
    setErrorFor(password2, "Repite la contraseña");
    setErrorFor(validUsername, "El usuario que ingresaste no está conectado a una cuenta. ");
    setErrorFor(validPassword, "La contraseña que ingresaste es incorrecta");
}


function mainUser() { 
    userEvents(); 
    getUserInfoFromStorage(); 
    loginStorageValidation(); 
}



mainUser() 