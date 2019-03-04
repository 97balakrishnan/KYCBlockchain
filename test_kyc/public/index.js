
function login() {
    var orgname = document.getElementById('orgname').value;
    console.log(orgname);
    window.localStorage.setItem('oname',orgname);
    location.href="http://localhost:3000/menu.html"
}