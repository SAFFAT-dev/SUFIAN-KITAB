const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  let errors = [];

  const isSignup = firstname_input !== null;

  if (isSignup) {
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    errors = getLoginFormErrors(
      email_input.value,
      password_input.value
    );
  }

  // If any basic validation errors
  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join('. ');
    return;
  }

  // ✅ Admin login validation
  if (!isSignup) {
    const adminPassword = 'admin1234';

    if (password_input.value === adminPassword) {
      // password correct → go to admin page
      e.preventDefault();
      window.location.href = 'profile.html';
    } else {
      // password wrong → show message
      e.preventDefault();
      error_message.innerText = 'Incorrect password.';
      password_input.parentElement.classList.add('incorrect');
      
    }
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }

  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }

  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  if (password.length < 8) {
    errors.push('Password must have at least 8 characters');
    password_input.parentElement.classList.add('incorrect');
  }

  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }

  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

// Clear error style on typing
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});
