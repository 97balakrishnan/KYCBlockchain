
window.onload = function() {
    obj = JSON.parse(localStorage.getItem('json'));
console.log(obj);
    document.getElementById('name').innerHTML= obj.name ;
	document.getElementById("gender").innerHTML = obj.gender;
	document.getElementById("dob").innerHTML = obj.dob ;
	document.getElementById("maritalstatus").innerHTML = obj.marital ;
	document.getElementById("aadhar").innerHTML = obj.aadhar;
	document.getElementById("driverslicense").innerHTML = obj.driver;
	document.getElementById("pan").innerHTML = obj.pan;
	document.getElementById("email").innerHTML = obj.email;
    document.getElementById("mobile").innerHTML = obj.mobile;
    document.getElementById("verifier").innerHTML = "Verified by => "+ localStorage.getItem('verifier');
}
function back() {
    location.href="http://localhost:3000/view_all_customers.html"
}
