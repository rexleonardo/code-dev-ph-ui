const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get("courseId");
// let spinner = document.querySelector("#spinner");
const token = localStorage.getItem("token");
let courseBackgroundPhoto = document.querySelector("#courseBackgroundPhoto");
let enrollButton = document.querySelector("#enrollButton");

// console.log(courseId);
let url = `https://code-dev-ph.herokuapp.com/api/courses/${courseId}`;

// if (!token || token === null) {
//     window.location.replace("./error.html")
// } else {
fetch(url)
	.then(res => res.json())
	.then(data => {
		// console.log(data);
		// display data in html
		let courseName = document.querySelector("#courseName");
		let courseDesc = document.querySelector("#courseDesc");
		let coursePrice = document.querySelector("#coursePrice");
		courseName.innerText = data.name.split(" ").join("\n");
		courseDesc.innerHTML = `
			<h1 class="course-description-title">//course description</h1>
            <p class="course-description-content"><strong>${data.description}</strong></p>
			<p class="course-description-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nam nulla quam at vel magni quod, enim veritatis saepe praesentium impedit vitae, explicabo dignissimos nesciunt fugiat quae quidem, consequuntur voluptas.
                    Maxime fugit iure voluptate facere. Vero accusantium libero aliquam quasi, soluta corrupti nostrum eaque, officiis, corporis obcaecati voluptatibus eligendi repellendus temporibus at iure praesentium assumenda! Quam quaerat aliquam natus exercitationem.
                    Illo quidem voluptas officia exercitationem quis eligendi nobis dignissimos nam maxime sed natus a et nostrum eius magni dolore sint aliquam, consequatur sapiente! Cum repudiandae aspernatur ipsa aperiam magnam deserunt.
                    Distinctio dolores est vel ipsam amet! Esse repudiandae adipisci, obcaecati ea vero ad, dolorem architecto quam ab totam ducimus, quae veniam itaque consequatur temporibus necessitatibus amet beatae perferendis corporis expedita!
                    Necessitatibus in tempora quo minima illo qui assumenda, dolor optio nostrum est labore eos quisquam sunt, suscipit ratione nobis repudiandae dolorum nemo id incidunt velit quasi! Vero quaerat ipsam adipisci.</p>
		`;
		coursePrice.innerHTML = `<span class="price-view">Price: &#8369; ${data.price}</span>`;
		// spinner.innerHTML = "";
		enrollButton.innerHTML = `<button class="btn btn-success enroll-button">Enroll</button>`;
		enrollButton.addEventListener("click", () => {
			if (!token || token === null) {
				alert("You need to sign in first!");
				window.location.replace("./../index.html");
			} else {
				fetch(`https://code-dev-ph.herokuapp.com/api/users/enroll`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage["token"]}`,
					},
					body: JSON.stringify({
						courseId: courseId,
					}),
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
						if (data === true) {
							// notfy the user that enrollment is successful
							alert("Thank you for enrolling! See you!");
							// redirect user to courses page
							window.location.replace("./courses.html");
						} else {
							// notify user that enrollment failed
							alert("Something went wrong");
						}
					});
			}
		});
	});
// }

function goBack() {
	window.history.back();
}

if (courseId === "6055ec25575a5500157abc19") {
	courseBackgroundPhoto.classList.add("frontend-photo");
} else if (courseId === "6055ec47575a5500157abc1a") {
	courseBackgroundPhoto.classList.add("backend-photo");
} else if (courseId === "6055ec5e575a5500157abc1b") {
	courseBackgroundPhoto.classList.add("full-stack-photo");
} else if (courseId === "6055ec75575a5500157abc1c") {
	courseBackgroundPhoto.classList.add("mobile-photo");
} else if (courseId === "6055ec88575a5500157abc1d") {
	courseBackgroundPhoto.classList.add("game-photo");
} else if (courseId === "6055ecf4575a5500157abc1e") {
	courseBackgroundPhoto.classList.add("data-science-photo");
} else if (courseId === "6055ed37575a5500157abc1f") {
	courseBackgroundPhoto.classList.add("devops-photo");
} else if (courseId === "6055ed4b575a5500157abc20") {
	courseBackgroundPhoto.classList.add("software-photo");
} else if (courseId === "6055ed76575a5500157abc21") {
	courseBackgroundPhoto.classList.add("web-photo");
} else if (courseId === "6055ed8c575a5500157abc22") {
	courseBackgroundPhoto.classList.add("security-photo");
} else {
	courseBackgroundPhoto.classList.add("home-background");
}
