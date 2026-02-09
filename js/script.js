document.addEventListener('DOMContentLoaded', () => {
    const guestMenu = document.getElementById('guest-menu');
    const userMenu = document.getElementById('user-menu');
    const welcomeText = document.getElementById('welcome-text');
    const logoutBtn = document.getElementById('logout-btn');

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (isLoggedIn === 'true' && storedUser) {
        if (guestMenu) guestMenu.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            userMenu.classList.add('align-items-center');
            welcomeText.textContent = `Hi, ${storedUser.name}!`;
        }
    }

    // Logout Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            alert("Logged out successfully!");
            window.location.reload(); // Refresh to update the UI
        });
    }

    // ... (Keep your existing Login and Register logic below this)
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Identify which form is on the current page
    const loginForm = document.querySelector('form[action="/login"]');
    const registerForm = document.querySelector('form[action="/register"]');

    // --- REGISTRATION LOGIC ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Basic Validation
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Save user object to localStorage
            const userDetails = {
                name: name,
                email: email,
                password: password
            };

            localStorage.setItem('registeredUser', JSON.stringify(userDetails));
            
            alert("Account created successfully! Please login.");
            window.location.href = "login.html";
        });
    }

    // --- LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('inputEmail').value;
            const passwordInput = document.getElementById('inputPassword').value;

            // Retrieve data from localStorage
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            if (storedUser && emailInput === storedUser.email && passwordInput === storedUser.password) {
                alert(`Welcome back, ${storedUser.name}!`);
                // Save a "session" so the dashboard knows we are logged in
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = "index.html"; 
            } else {
                alert("Invalid email or password. Did you register first?");
            }
        });
    }
});