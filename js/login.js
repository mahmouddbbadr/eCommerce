var email = document.getElementById("email")
var password = document.getElementById("password")


var loginForm = document.getElementById("loginForm")
var loginBtn = document.getElementById("loginBtn")





loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var foundUser = users.find(u => u.email === email.value && u.password === password.value);

    if (foundUser) {
        sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
        location.href = "index.html";
    } else {
        alert("Invalid email or password");
    }
});

