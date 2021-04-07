let adminUser = localStorage["isAdmin"];
let adminButton = document.querySelector("#adminButton");
const token = localStorage.getItem("token");
let cardFooter, url;
const profileButton = document.querySelector("#profileButton");

if (adminUser == "false" || !adminUser) {
	url = "https://code-dev-ph.herokuapp.com/api/courses/";
	adminButton.innerHTML = "";
} else {
	url = "https://code-dev-ph.herokuapp.com/api/courses/admin";
	3;
	profileButton.innerHTML = "";
	adminButton.innerHTML = `
		<div>
			<a href="./addCourse.html" class="btn btn-success add-course-button"><img src="./../assets/images/icons/add.svg" alt="add" class="icons"><span>Add Course<span></a>
		<div>
	`;
}

if (!token || token === null) {
	window.location.replace("./error.html");
} else {
	fetch(url)
		.then(res => {
			return res.json();
		})
		.then(data => {
			// console.log('data')
			// console.log(data)
			function displayCardFooter(courseId, isActive) {
				// console.log('courseId')
				// console.log(courseId)
				if (adminUser == "false" || !adminUser) {
					cardFooter = `<a href="./course.html?courseId=${courseId}" class="btn btn-success view-course-button">View Course</a>`;
				} else {
					let switchStatus,
						switchMsg = "";
					if (isActive == true) {
						switchMsg = "ON";
						switchStatus = "checked";
					} else {
						switchMsg = "OFF";
						switchStatus = "unchecked";
					}
					cardFooter = `
						<div class="d-flex justify-content-between align-items-center">
							<div class="form-check form-switch form-switch-lg">
								<input class="form-check-input" type="checkbox" id="${courseId}" ${switchStatus} value="${isActive}">
								<label class="form-check-label status" id="label${courseId}" for="${courseId}">${switchMsg}</label>
							</div>
							<div>
								<a href="./editCourse.html?courseId=${courseId}" class="btn btn-primary edit-course-button">
									<img src="./../assets/images/icons/edit.svg" alt="edit" class="icons">
								</a>
								<a href="./enrollees.html?courseId=${courseId}" class="btn btn-warning view-enrollees-button">
									<img src="./../assets/images/icons/list.svg" alt="add" class="icons">
								</a>
							</div>
						</div>
					`;
				}
				return cardFooter;
			}
			// console.log(data)
			// <li>name</li>
			let courseContainer = document.querySelector("#courseContainer");
			let courseData = data.map(elem => {
				// console.log('elem')
				// console.log(elem)
				return `
					<div class="col-12 col-md-6 col-lg-4 my-3">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">${elem.name}</h5>
								<span class="card-text price-view">&#8369; ${elem.price}</span>
								<p class="card-text">${elem.description}</p>
							</div>
							<div class="card-footer">
								${displayCardFooter(elem._id, elem.isActive)}
							</div>
						</div>
					</div>
				`;
			});
			// console.log(courseData.join(""))
			courseContainer.innerHTML = courseData.join("");
		});
	// }
}
document.addEventListener("change", event => {
	statusFunc(event.target.id, event.target.value);
	if (event.target.value == "true") {
		event.target.value = "false";
	} else {
		event.target.value = "true";
	}
});

statusFunc = (courseId, status) => {
	if (status == "false") {
		fetch(`https://code-dev-ph.herokuapp.com/api/courses/${courseId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				return (document.querySelector(`#label${courseId}`).innerText =
					"ON");
			});
	} else {
		fetch(`https://code-dev-ph.herokuapp.com/api/courses/${courseId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				return (document.querySelector(`#label${courseId}`).innerText =
					"OFF");
			});
	}
};
