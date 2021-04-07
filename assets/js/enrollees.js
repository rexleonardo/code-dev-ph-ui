let params = new URLSearchParams(window.location.search);
// console.log(params.get('courseId'));
let courseId = params.get("courseId");
let token = localStorage.getItem("token");

const courseName = document.querySelector("#courseName");
const spinner = document.querySelector("#spinner");
const enrolleesDetails = document.querySelector("#enrolleesDetails");

if (!token || token === null) {
	alert("You must login first!");
	window.location.href = "./login.html";
} else {
	fetch(`https://code-dev-ph.herokuapp.com/api/courses/${courseId}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(res => res.json())
		.then(data => {
			courseName.innerHTML = `<h3>${data.name}</h3>`;
			data.enrollees.forEach(course => {
				let date = new Date(course.enrolledOn);

				const tr = document.createElement("tr");
				tr.innerHTML = `
                    <td>${course.userId}</td>
                    <td>${date}</td>
                `;
				enrolleesDetails.appendChild(tr);
			});
			spinner.innerHTML = "";
		})
		.catch(err => console.log(err));
}
