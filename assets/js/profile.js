let token = localStorage.getItem("token");

const spinner = document.querySelector("#spinner");
const userDetailsContainer = document.querySelector("#userDetails");
const courseDetailsContainer = document.querySelector("#courseDetails");

if (!token || token === null) {
	window.location.replace("./error.html");
} else {
	fetch("https://code-dev-ph.herokuapp.com/api/users/details", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then(res => res.json())
		.then(data => {
			userDetailsContainer.innerHTML = `
            <h3 class="user-details">//user details</h3>
            <p><span class="user-info">First Name:</span> <span>${data.firstName}</span</p>
            <p><span class="user-info">Last Name:</span> <span>${data.lastName}</span</p>
            <p><span class="user-info">Email:</span> <span>${data.email}</span</p>
            <p><span class="user-info">Mobile Number:</span> <span>${data.mobileNo}</span</p>
        `;
			data.enrollments.forEach(course => {
				fetch(
					`https://code-dev-ph.herokuapp.com/api/courses/${course.courseId}`
				)
					.then(res => res.json())
					.then(data => {
						let date = new Date(course.enrolledOn);

						const tr = document.createElement("tr");
						tr.innerHTML = `
                            <td>${data.name}</td>
                            <td>${date.toUTCString()}</td>
                            <td>${course.status}</td>
                        `;
						courseDetailsContainer.appendChild(tr);
					});
			});
			spinner.innerHTML = "";
		})
		.catch(err => console.log(err));
}
