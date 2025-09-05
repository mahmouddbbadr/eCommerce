var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var email = document.getElementById("email")
var password = document.getElementById("password")
var confirmPassword = document.getElementById("confirmPassword")
var fNameValidation = document.getElementById("fNameValidation")
var lNameValidation = document.getElementById("lNameValidation")
var emailValidation = document.getElementById("emailValidation")
var passwordValidation = document.getElementById("passwordValidation")
var confirmPasswordValidation = document.getElementById("confirmPasswordValidation")

var registerForm = document.getElementById("registerForm")
var SubmissionBtn = document.getElementById("SubmissionBtn")

window.addEventListener('load', ()=>{
    SubmissionBtn.disabled = true
})


firstName.addEventListener("input", function(){
    if(!firstName.value){
        fNameValidation.style.display = "block"
        fNameValidation.innerHTML = "First name is requeired"
    }
    else if(firstName.value.includes(" ")){
        fNameValidation.style.display = "block"
        fNameValidation.innerHTML = "Can not have spaces"
    }
    else if(!/^[a-zA-z]{2,}$/.test(firstName.value)){
        fNameValidation.style.display = "block"
        fNameValidation.innerHTML = "only strings & more than 1 character"
    }
    else{
        fNameValidation.style.display = "none"
    }
    checkFormValidity()
})

lastName.addEventListener("input", function(){
    if(!lastName.value){
        lNameValidation.style.display = "block"
        lNameValidation.innerHTML = "Last name is requeired"
    }
    else if(lastName.value.includes(" ")){
        lNameValidation.style.display = "block"
        lNameValidation.innerHTML = "Can not have spaces"
    }
    else if(!/^[a-zA-z]{2,}$/.test(lastName.value)){
        lNameValidation.style.display = "block"
        lNameValidation.innerHTML = "only strings & more than 1 character"
    }
    else{
        lNameValidation.style.display = "none"
    }
    checkFormValidity()
})

email.addEventListener("input", function(){
    if(!email.value){
        emailValidation.style.display = "block"
        emailValidation.innerHTML = "email is requeired"
    }
    else if(email.value.includes(" ")){
        emailValidation.style.display = "block"
        emailValidation.innerHTML = "Can not have spaces"
    } 
    else if(!email.value.includes("@")){
        emailValidation.style.display = "block";
        emailValidation.innerHTML = "Email must contain @";
    }
    else if(!(email.value.endsWith("gmail.com") || email.value.endsWith("yahoo.com"))){
        emailValidation.style.display = "block"
        emailValidation.innerHTML = "email must end with gmail.com or yahoo.com"
    } 
    else if(!/^[a-zA-Z0-9._]+@(gmail\.com|yahoo\.com)$/.test(email.value)){
        emailValidation.style.display = "block"
        emailValidation.innerHTML = "Only strings, numbers, '.' and '_' are allowed"
    }
    else{
        emailValidation.style.display = "none"
    }
    checkFormValidity()
})

password.addEventListener("input", function(){
    if(!password.value){
        passwordValidation.style.display = "block"
        passwordValidation.innerHTML = "Password is requied"
    }
    if(password.value.length < 8){
        passwordValidation.style.display = "block"
        passwordValidation.innerHTML = "Password must be at least 8 characters"
    }
    if(password.value.includes(" ")){
        passwordValidation.style.display = "block"
        passwordValidation.innerHTML = "Password can not have spaces"
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password.value)){
        passwordValidation.style.display = "block"
        passwordValidation.innerHTML = "must include at least 1 lowercase, 1 uppercase, 1 number, 1 special char"
    }
    else{
        passwordValidation.style.display = "none"
    }
    checkFormValidity()
})

confirmPassword.addEventListener("input", function(){
    if(!confirmPassword.value){
        confirmPasswordValidation.style.display = "block"
        confirmPasswordValidation.innerHTML = "Confirm password is requied"
    }
    else if(confirmPassword.value !== password.value){
        confirmPasswordValidation.style.display = "block"
        confirmPasswordValidation.innerHTML = "passwords do not match"
    }
    else{
        confirmPasswordValidation.style.display = "none"
    }
    checkFormValidity()
})



registerForm.addEventListener("submit", function(event){
    event.preventDefault()

    SubmissionBtn.disabled = false
    var user ={
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }
    var users = JSON.parse(localStorage.getItem("users")) || []
    var exists = users.some(u=> u.email === user.email)
    if(exists){
        alert("Email already registered")
        return
    }

    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    alert("Registered successfully")
    location.href = "login.html"
    }
    )

function checkFormValidity() {
    if (
        fNameValidation.style.display === 'none' &&
        lNameValidation.style.display === 'none' &&
        emailValidation.style.display === 'none' &&
        passwordValidation.style.display === 'none' &&
        confirmPasswordValidation.style.display === 'none' &&
        firstName.value &&
        lastName.value &&
        email.value &&
        password.value &&
        confirmPassword.value
    ) {
        SubmissionBtn.disabled = false;
    } else {
        SubmissionBtn.disabled = true;
    }
}


