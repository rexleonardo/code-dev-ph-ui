// login using js fetch
// if login is successful
// log the token
// if not alert("Something went wrong")
// let token = localStorage.getItem('token');
// if (!token || token === null) {
//     console.log('Hi')
// } else {
// alert('You have been logged out!')
let logInUser = document.querySelector("#logInUser");
localStorage.clear();
logInUser.addEventListener("submit", e => {
	e.preventDefault();

	let email = document.querySelector("#email").value;
	let password = document.querySelector("#password").value;

	let url = "https://code-dev-ph.herokuapp.com/api/users/login";
	let options = {
		method: "POST",
		body: JSON.stringify({
			email: email,
			password: password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	};

	fetch(url, options)
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if (!data) return alert("Something went wrong");
			if (data) {
				// store access token in local storage
				localStorage.setItem("token", data.accessToken);

				fetch("https://code-dev-ph.herokuapp.com/api/users/details", {
					headers: {
						Authorization: `Bearer ${localStorage["token"]}`,
					},
				})
					.then(res => res.json())
					.then(user => {
						console.log(user);
						// id
						// isAdmin
						localStorage["id"] = user._id;
						localStorage["isAdmin"] = user.isAdmin;
						// redirect page
						window.location.replace("./pages/courses.html");
					});
			}
		});
});
// }
