var loginData = JSON.parse(localStorage.getItem("AllData"));      

console.log(loginData);

var loginEmailInput = document.querySelector('.loginEmail');
var loginPasswordInput = document.querySelector('.loginPassword');
var dataState = document.querySelector('.dataState');
var signinBtn = document.querySelector('.signin-btn');

var vaildEmailLoginState;
var vaildPasswordLoginState;

var welcomeSection = document.querySelector('#userName');




// !=====================CHECKING VAILDATION OF SIGNIN-INPUTSDATA===========================>

function checkSignInEmailData(loginTypedEmail){
//Function to check user Email Input with actual localStorage Data if it is true will return true and exit the loop if false will continue looping
        for(var i = 0; loginData.length>i; i++){
                var savedEmailData = loginData[i].userEmail;       
                if(loginTypedEmail == savedEmailData){
                        return true;
                }

            }
};
function checkSignInPasswordData(loginTypedPassword){ 
//Function to check user Password Input with actual localStorage Data if it is true will return true and exit the loop if false will continue looping.
// Also gives data of userName log in to display it in the home page
        for(var i = 0; loginData.length>i; i++){
            var savedPasswordData = loginData[i].userPassword;
            if(loginTypedPassword == savedPasswordData){
                localStorage.setItem("LoggedIn", loginData[i].userName)
                return true;             
            }
        }
};

loginEmailInput.addEventListener('change',function(){
// Listen to any Email Input change value event to execute the checkSignInEmailData function to return true if user email input matches the actual data saved
    dataState.innerText = '';
    if(checkSignInEmailData(loginEmailInput.value)){ 
        return vaildEmailLoginState = true;
    }  
    else{
        return vaildEmailLoginState = false;
    }
});

loginPasswordInput.addEventListener('change',function(){ 
// Listen to any Password Input change value event to execute the checkSignInEmailData function to return true if user email input matches the actual data saved  
    dataState.innerText = '';
    if(checkSignInPasswordData(loginPasswordInput.value)){
        return vaildPasswordLoginState = true;
    } 
    else{
        return vaildPasswordLoginState = false;
    }
});

// !=====================CHECKING VAILDATION OF SIGNIN-INPUTSDATA===========================>

// Click and Enter press Events to signIn the data By mouse and Enter key.
signinBtn.addEventListener("click", function(){  
// Waits for any click event on login Btn to find if values are matched will send you to home page if not will remove inputs values from inputs tag and tells you incorrect email or password
    if(vaildEmailLoginState && vaildPasswordLoginState){
        location.href = "./home.html";
        dataState.classList.remove('text-danger');  
        dataState.classList.add('text-success'); 
        dataState.innerText = `Vaild Inputs`; 
    }
    else{
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
        dataState.classList.remove('text-success');
        dataState.classList.add('text-danger');
        dataState.innerText = `incorrect email or password`;       
    }
});

document.addEventListener("keyup",function(e){
    if(e.code == "Enter"){
        if(vaildEmailLoginState && vaildPasswordLoginState){
            location.href = "./home.html";
            dataState.classList.remove('text-danger');  
            dataState.classList.add('text-success'); 
            dataState.innerText = `Vaild Inputs`; 
           
        }
        else{
            loginEmailInput.value = '';
            loginPasswordInput.value = '';
            dataState.classList.remove('text-success');
            dataState.classList.add('text-danger');
            dataState.innerText = `incorrect email or password`;       
        }
    }
});





