// answer
// const urlParams = new URLSearchParams(window.location.search);
// const courseId = urlParams.get('courseId');

// let courseName = document.querySelector('#courseName')
// let courseDescription = document.querySelector('#courseDescription')
// let coursePrice = document.querySelector('#coursePrice')

// fetch(`http://localhost:4000/api/courses/${courseId}`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         courseName.value = data.name
//         courseDescription.innerText = data.description
//         coursePrice.value = data.price
//     })

// let editCourse = document.querySelector('#editCourse')
// editCourse.addEventListener('submit', e => {
//     e.preventDefault()

//     let url = "http://localhost:4000/api/courses/";
//     let options = {
//         method: "PUT",
//         body: JSON.stringify({
//             _id: courseId,
//             name: courseName.value,
//             price: coursePrice.value,
//             description: courseDescription.value
//         }),
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage["token"]}`
//         }
//     }

//     fetch(url, options)
//         .then(res => res.json())
//         .then(data => {
//             if (!data) return alert("Something went wrong")
//             window.location.replace('./courses.html');
//         })
// })

// solution

let params = new URLSearchParams(window.location.search);

// console.log(params.get('courseId'));
//has method checks if the courseId key exists in URL query string
//returns a boolean value - true/false
// console.log(params.has('courseId'))

let courseId = params.get("courseId");

let name = document.querySelector("#courseName");
let price = document.querySelector("#coursePrice");
let description = document.querySelector("#courseDescription");
const token = localStorage.getItem("token");
let adminUser = localStorage["isAdmin"];

if ((!token || token === null) && (adminUser == "false" || !adminUser)) {
	window.location.replace("./error.html");
} else {
	fetch(`https://code-dev-ph.herokuapp.com/api/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			// console.log(data)

			//assign the current values to the inputs fields
			name.value = data.name;
			price.value = data.price;
			description.value = data.description;

			document
				.querySelector("#editCourse")
				.addEventListener("submit", e => {
					e.preventDefault();
					// console.log("Hello Batch 94")
					// console.log(`${name.value} ${price.value} ${description.value}`)

					let courseName = name.value;
					let courseDesc = description.value;
					let coursePrice = price.value;
					let token = localStorage.getItem("token");

					fetch("https://code-dev-ph.herokuapp.com/api/courses/", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							_id: courseId,
							name: courseName,
							description: courseDesc,
							price: coursePrice,
						}),
					})
						.then(res => res.json())
						.then(data => {
							// console.log(data)
							if (data === true) {
								window.location.replace("./courses.html");
							} else {
								alert("something went wrong!");
							}
						});
				});
		});
}
