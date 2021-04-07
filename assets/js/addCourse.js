// make create course feature usuable
// if successful in creating the course, redirect user in courses.html
// otherwise alert("Something went wrong");
// 15 mins
// before deadline link your work in "Course Booking Create Course" in Boodle
// link your "origin" repository

// answer
// let createCourse = document.querySelector('#createCourse');
// createCourse.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let name = document.querySelector('#name').value;
//     let price = document.querySelector('#price').value;
//     let description = document.querySelector('#description').value;
//     let url = "http://localhost:4000/api/courses"
//     let options = {
//         method: "POST",
//         body: JSON.stringify({
//             name: name,
//             price: price,
//             description: description
//         }),
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage["token"]}`
//         }
//     }
//     fetch(url, options)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (data) {
//                 alert("Course added Succesfully");
//                 window.location.replace("./courses.html")
//             } else {
//                 alert("Something went wrong");
//             }
//         })
// })

// solution
let createCourse = document.querySelector("#createCourse");
const token = localStorage.getItem("token");
let adminUser = localStorage["isAdmin"];

if ((!token || token === null) && (adminUser == "false" || !adminUser)) {
	window.location.replace("./error.html");
} else {
	createCourse.addEventListener("submit", e => {
		e.preventDefault();

		let name = document.querySelector("#name").value;
		let price = document.querySelector("#price").value;
		let description = document.querySelector("#description").value;

		let url = "https://code-dev-ph.herokuapp.com/api/courses";
		let options = {
			method: "POST",
			body: JSON.stringify({
				name: name,
				price: price,
				description: description,
			}),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage["token"]}`,
			},
		};

		fetch(url, options)
			.then(res => res.json())
			.then(data => {
				if (!data) return alert("Something went wrong");
				window.location.replace("./courses.html");
			});
	});
}
