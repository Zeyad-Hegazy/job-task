const submit = document.getElementById("submit");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

document.querySelectorAll("form div[data-error]").forEach((e) => {
	e.removeAttribute("data-error");
});

submit.addEventListener("click", (e) => {
	let nameValid = false;
	let emailValid = false;
	let passwordValid = false;
	let confirmPasswordValid = false;

	const RegExpUserName = /^[^0-9][a-z0-9]+[^0-9]$/gi;
	if (5 <= userName.value.length <= 15 && RegExpUserName.test(userName.value)) {
		nameValid = true;
	} else {
		userName.parentElement.setAttribute(
			"data-error",
			"this userName is Invalid"
		);
	}

	const RegExpEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gi;
	if (RegExpEmail.test(email.value)) {
		emailValid = true;
		localStorage.setItem("Email", email.value);
	} else {
		email.parentElement.setAttribute("data-error", "this Email is Invalid");
	}

	if (password.value.length >= 8) {
		passwordValid = true;
	} else {
		password.parentElement.setAttribute(
			"data-error",
			"this password is Invalid"
		);
	}

	if (
		confirmPassword.value === password.value &&
		confirmPassword.value !== ""
	) {
		confirmPasswordValid = true;
	} else {
		confirmPassword.parentElement.setAttribute(
			"data-error",
			"this Password is not Match previous Password"
		);
	}

	if (
		nameValid === false ||
		emailValid === false ||
		passwordValid === false ||
		confirmPasswordValid === false
	) {
		e.preventDefault();
	} else {
		window.location.href = "http://127.0.0.1:5500/success.html";
	}
});

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	console.log(data);

	fetch("https://goldblv.com/api/hiring/tasks/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
});
