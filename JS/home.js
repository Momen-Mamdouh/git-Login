var loggedInUserName = localStorage.getItem("LoggedIn");
var welcomeSection = document.querySelector('#userName');
welcomeSection.innerText = `${loggedInUserName}`;
