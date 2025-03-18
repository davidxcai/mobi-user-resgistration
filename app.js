document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if form is valid before submitting
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Collect form data
    const formData = {
      studentId: document.getElementById("studentId").value,
      firstName: document.getElementById("firstName").value,
      name: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
      },
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      username: document.getElementById("username").value,
    };

    console.log("Sending Data:", formData); // Debugging

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Registration successful!");
        // Optionally redirect user
        // window.location.href = "/success-page.html";
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Registration failed. Please try again.");
    }
  });

  // Bootstrap validation logic
  (() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();
});
