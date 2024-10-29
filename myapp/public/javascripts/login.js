async function handleLogin(event) {
    event.preventDefault();

    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const data = {
      username: formData.get('username'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      // Remove any previous alert message
      document.getElementById('alertContainer').innerHTML = '';

      if (response.ok) {
        // Show success message and redirect
        document.getElementById('alertContainer').innerHTML = `
          <div class="alert alert-success" role="alert">
            Login successful! Redirecting...
          </div>
        `;
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        // Show error message
        document.getElementById('alertContainer').innerHTML = `
          <div class="alert alert-danger" role="alert">
            ${result.message || 'Login failed. Please check your credentials and try again.'}
          </div>
        `;
      }
    } catch (error) {
      document.getElementById('alertContainer').innerHTML = `
        <div class="alert alert-danger" role="alert">
          An error occurred. Please try again later.
        </div>
      `;
    }
  }
