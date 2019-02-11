
function login() {
    var email = document.getElementById('email').value;
    console.log(email);
    window.localStorage.setItem('uemail',email);
    location.href="http://127.0.0.1:8080/pending_requests.html"
}