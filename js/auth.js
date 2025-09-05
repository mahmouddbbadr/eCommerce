
window.onload = function () {
    var currentUser = sessionStorage.getItem("currentUser");

    if (!currentUser) {
        alert("You must log in first!");
        location.href = "login.html";
    }
};
