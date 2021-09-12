const contactForm = document.querySelector(".form-job");

let pubName = document.getElementById("pubName");
let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let loc = document.getElementById("loc");
let driving = document.getElementById("driving");
let position = document.getElementById("position");
let experience = document.getElementById("experience");
let about = document.getElementById("about");
let checkContact = document.getElementById("checkContact");

// $.ajax({
//   url: "https://still-harbor-97993.herokuapp.com",
//   type: "POST",
//   headers: { Accept: "application/json;" },
//   data: {
//     subject: "subject",
//     message: "some body text",
//   },
// }).done(function (res) {
//   console.log(res); // it shows your email sent message.
// });

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    pubName: pubName.value,
    fullname: fullname.value,
    email: email.value,
    phone: phone.value,
    loc: loc.value,
    driving: driving.value,
    position: position.value,
    experience: experience.value,
    about: about.value,
    checku: checku.value,
    checkContact: checkContact.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("Content-type", "application/json");

  // xhr.onload = function () {
  //   if (xhr.readyState === xhr.DONE) {
  //     if (xhr.status === 200) {
  //       alert("Email sent");
  //     } else {
  //       alert("Something went wrong!");
  //     }
  //   }
  // };

  xhr.onload = function () {
    console.log(xhr.responseText);

    if (xhr.responseText == "success") {
      alert("Email sent");
      fullname.value = "";
      email.value = "";
      phone.value = "";
      loc.value = "";
      driving.value = "";
      position.value = "";
      experience.value = "";
      about.value = "";
      checku.value = "";
      checkContact.value = "";
    } else {
      alert("Something went wrong!");
      console.log(err);
    }
  };

  xhr.send(JSON.stringify(formData));
});

function checkIf() {
  const checkbox = document.getElementById("checkContact");
  if (checkbox.checked == true) {
    checkContact.value = "DO NOT CALL ME!";
  }
}
