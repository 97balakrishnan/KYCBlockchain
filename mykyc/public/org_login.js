
function login() {
    var orgname = document.getElementById('orgname').value;
    console.log(orgname);
    window.localStorage.setItem('oname',orgname);
    location.href="http://127.0.0.1:8080/view_customers.html"
}