function mockFetch(url, options) {
  return Promise.resolve({
      json: () => Promise.resolve({ message: 'Successfully logged in!' }),
  });
}

window.fetch = mockFetch;

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function submitForm() {
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  const emailError = document.querySelector('.error-message');

  if (!validateEmail(email)) {
      emailError.textContent = 'Please enter a valid email address';
      return;
  } else {
      emailError.textContent = '';
  }

  const data = {
      email: email,
      password: password
  };

  const serverUrl = 'https://test.com';

  fetch(`${serverUrl}/auth`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);
      window.location.assign('https://example.com');
  })
  .catch(error => {
      alert(error);
  });
}


document.querySelector('.submit')
  .addEventListener('click', submitForm);