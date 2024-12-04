var loginData = [];
 if (localStorage.getItem("AllData") !=null){
    loginData = JSON.parse(localStorage.getItem("AllData"));  
 };
console.log(loginData);

var isVaild;

var nameRegx= /^[A-Z][\D]+$/; // Must begin with capitalized Character
var emailRegx = /^[\w]+@[a-z]+.com$/; //Any regular email must contain @, .com , any character or number no special character

var passwordRegx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //At least one (upper case-lower case- digit) &  Minimum eight 


var nameInput = document.querySelector('.nameInput');
var emailInput = document.querySelector('.emailInput');
var passwordInput = document.querySelector('.passInput');



var nameWarningMessage = `First Character msut be Captialized and name can't be one letter`;
var emailWarningMessage = 'Email must contain @, .com with no specail character';
var passwordWarningMessage = `password has at least one (upper case-lower case- digit) &  Minimum eight `;

var dataState;

var vaildNameState;
var vaildEmailState;
var vaildPasswordState;


var registrationElement = document.querySelector('.registration-state');
var signupBtn = document.querySelector('.signup-btn');





// !=====================CHECKING SIGNUP-INPUTSDATA===========================>

function checkSignUpData(dataType,regexType,inputParagraph){
// Function to test the regex of inputs and if it's vaild it's loop in localStorage to check ifit already sinUp before or not.
    registrationElement.innerText=``;
    dataValue = dataType.value;
    isVaild = regexType.test(dataValue);
    if(isVaild){
        dataType.classList.remove('is-invalid');
        dataType.classList.add('is-valid');
        dataState.classList.remove('text-danger');
        dataState.classList.add('text-success');
        dataState.innerText = 'Accepted';
        for(var i = 0; i < loginData.length; i++){
            if(loginData[i].userEmail == emailInput.value){           
                registrationElement.classList.add('text-danger')
                registrationElement.classList.remove('text-success')
                registrationElement.innerText = "Already used Email Please Use another Email";
                dataState.innerText = '';      
                dataType.classList.add('is-invalid');
                dataType.classList.remove('is-valid');
                dataState.classList.add('text-danger');
                dataState.classList.remove('text-success');
                return false
            }
            else  if(emailInput.value == "") {    
                dataState.innerText = '';
                return false
            }
            else{
                registrationElement.classList.remove('text-danger')
                registrationElement.classList.add('text-success')
                registrationElement.innerText = "Can use this Email";
                dataType.classList.add('is-valid');
                dataType.classList.remove('is-invalid');
                dataState.innerText = '';
                return true;
               

            }
        }
        
        return true
    }
    else if(dataValue ==""){
        dataType.classList.remove('is-valid','text-success');
        dataType.classList.add('is-invalid');
        dataState.classList.add('text-danger');
        dataState.innerText = 'Required';

        document.addEventListener('click',function(e){  
            dataType.classList.remove('is-invalid');
            dataState.innerText = '';
        })
        
    }
    else{
        dataType.classList.remove('is-valid');
        dataType.classList.add('is-invalid');
        dataState.classList.remove('text-success');
        dataState.classList.add('text-danger');
        dataState.innerText = inputParagraph; 
        return false
    }  
};
function returnigStateToSaveData(inputState, inputType, inputRegexType, inputWarningMessage){
// Functino to return state of inputs vaild or not 
    dataState = document.querySelector(inputState);
    if(checkSignUpData(inputType,inputRegexType,inputWarningMessage)){
        vaildNameState = true;
        vaildEmailState = true;
        vaildPasswordState = true;
        return true;
    }
    else{
        vaildNameState = false;
        vaildEmailState = false;
        vaildPasswordState = false;
        return false;
    }
};

// Change Events to check inputs data is vaild or not.
nameInput.addEventListener('change',function(){
    returnigStateToSaveData('.inputNameState', nameInput, nameRegx, nameWarningMessage, vaildNameState)
});
emailInput.addEventListener('change',function(){
    returnigStateToSaveData('.inputEmailState', emailInput, emailRegx, emailWarningMessage, vaildEmailState)
});
passwordInput.addEventListener('change',function(){
    returnigStateToSaveData('.inputPasswordState', passwordInput, passwordRegx, passwordWarningMessage, vaildPasswordState)

});

// !=====================CHECKING SIGNUP-INPUTSDATA===========================>


// !=====================SAVING REGESTRATION-DATA===========================>

function savingVaildUserData(){
// Funciton saves data after checking if it vaild and not used before.
    if(vaildNameState && vaildEmailState && vaildPasswordState){
        registrationElement.classList.remove('text-danger');
        registrationElement.classList.add('text-success');
        
        registrationElement.innerText=`Successful registration`
        var userValidData = {
            userName: nameInput.value,
            userEmail: emailInput.value,
            userPassword: passwordInput.value,
        };
    
        loginData.push(userValidData);
        localStorage.setItem('AllData', JSON.stringify(loginData)); 
        return true;
    }

    else{
        registrationElement.classList.remove('text-success');
        registrationElement.classList.add('text-danger');
        registrationElement.innerText=`InVaild Inputs`;
        return false
    }

    
};
function signUp(){
// Function to signUp the data After checking and transport to login Page.
    if(savingVaildUserData()){
        location.href= "./index.html" 
    }
};

// Click and Enter press Events to signUp the data By mouse and Enter key.
signupBtn.addEventListener('click', function(){
    signUp()  
});
document.addEventListener("keyup",function(e){
    if(e.code == "Enter"){
        signUp()
    } 
});


// !=====================SAVING REGESTRATION-DATA===========================>

