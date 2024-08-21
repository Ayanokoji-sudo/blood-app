// app.js
const users = JSON.parse(localStorage.getItem('users')) || [];
let loggedInUser = null;

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

document.getElementById('userType').addEventListener('change', function() {
    const userType = this.value;
    document.getElementById('availabilitySection').style.display = userType === 'donor' ? 'block' : 'none';
    document.getElementById('diagnosisSection').style.display = userType === 'patient' ? 'block' : 'none';
});

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        loggedInUser = user;
        alert('Login successful');

        document.getElementById('donorPanel').style.display = 'none';
        document.getElementById('patientPanel').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'none';
        document.getElementById('donorSearch').style.display = 'none';
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';

        if (username === 'admin') {
            showAdminPanel();
        } else if (user.type === 'donor') {
            showDonorPanel();
        } else {
            showPatientPanel();
        }
    } else {
        alert('Invalid username or password');
    }
}

function logout() {
    loggedInUser = null;
    document.getElementById('donorPanel').style.display = 'none';
    document.getElementById('patientPanel').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('donorSearch').style.display = 'none';
    showLoginForm();
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const type = document.getElementById('userType').value;
    const bloodType = document.getElementById('bloodType').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const available = document.getElementById('available').value;
    const diagnosis = document.getElementById('diagnosis').value;

    const newUser = {
        username,
        password,
        type,
        bloodType,
        phoneNumber,
        email,
        location,
        available,
        diagnosis
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    showLoginForm();
}

function showDonorPanel() {
    document.getElementById('donorName').textContent = `Welcome, ${loggedInUser.username}`;
    document.getElementById('donorPanel').style.display = 'block';
}

function showPatientPanel() {
    document.getElementById('patientName').textContent = `Welcome, ${loggedInUser.username}`;
    document.getElementById('patientPanel').style.display = 'block';
}

function showAdminPanel() {
    const adminDonorList = document.getElementById('adminDonorList');
    adminDonorList.innerHTML = '';
    users.forEach(user => {
        if (user.type === 'donor') {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.bloodType}`;
            adminDonorList.appendChild(li);
        }
    });
    document.getElementById('adminPanel').style.display = 'block';
}

function findDonor() {
    const bloodType = document.getElementById('searchBloodType').value.toLowerCase();
    const availability = document.getElementById('searchAvailability').value.toLowerCase();
    
    const donorList = document.getElementById('donorList');
    donorList.innerHTML = '';
    
    users.forEach(user => {
        if (user.type === 'donor' && 
            (bloodType === '' || user.bloodType.toLowerCase().includes(bloodType)) && 
            (availability === '' || user.available.toLowerCase().includes(availability))) {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.bloodType} - ${user.phoneNumber} - ${user.email} - ${user.location}`;
            donorList.appendChild(li);
        }
    });
    
    document.getElementById('donorSearch').style.display = 'block';
}

function updateAvailability() {
    const newAvailability = document.getElementById('donorAvailability').value;
    loggedInUser.available = newAvailability;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Availability updated');
}

function saveDiagnosis() {
    const diagnosis = document.getElementById('patientDiagnosis').value;
    loggedInUser.diagnosis = diagnosis;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Diagnosis saved');
}

function switchToPatient() {
    loggedInUser.type = 'patient';
    localStorage.setItem('users', JSON.stringify(users));
    showPatientPanel();
}

function switchToDonor() {
    loggedInUser.type = 'donor';
    localStorage.setItem('users', JSON.stringify(users));
    showDonorPanel();
}
// Show Donor Search Panel
function showDonorSearch() {
    document.getElementById('donorSearch').style.display = 'block';
    document.getElementById('donorPanel').style.display = 'none';
    document.getElementById('patientPanel').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
}
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (username === 'admin' && password === 'adminpass') {
        loggedInUser = { username: 'admin', type: 'admin' };
        alert('Admin login successful');
        showAdminPanel();
    } else if (user) {
        loggedInUser = user;
        alert('Login successful');
        if (user.type === 'donor') {
            showDonorPanel();
        } else if (user.type === 'patient') {
            showPatientPanel();
        }
    } else {
        alert('Invalid username or password');
    }
}
function showAdminPanel() {
    const adminDonorList = document.getElementById('adminDonorList');
    adminDonorList.innerHTML = '';
    
    users.forEach(user => {
        if (user.type === 'donor') {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.bloodType} - ${user.phoneNumber} - ${user.email} - ${user.location}`;
            adminDonorList.appendChild(li);
        }
    });
    
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('donorPanel').style.display = 'none';
    document.getElementById('patientPanel').style.display = 'none';
    document.getElementById('donorSearch').style.display = 'none';
}
// Function to add a new donor
function addNewDonor() {
    const username = document.getElementById('newDonorUsername').value;
    const password = document.getElementById('newDonorPassword').value;
    const bloodType = document.getElementById('newDonorBloodType').value;
    const phoneNumber = document.getElementById('newDonorPhoneNumber').value;
    const email = document.getElementById('newDonorEmail').value;
    const location = document.getElementById('newDonorLocation').value;
    const available = document.getElementById('newDonorAvailability').value;

    const newDonor = {
        username,
        password,
        type: 'donor',
        bloodType,
        phoneNumber,
        email,
        location,
        available
    };

    users.push(newDonor);
    localStorage.setItem('users', JSON.stringify(users));
    alert('New donor added successfully');
    showAdminPanel();
}

// Function to customize the page
function customizePage() {
    const backgroundColor = document.getElementById('backgroundColorPicker').value;
    const headerColor = document.getElementById('headerColor').value;

    document.body.style.backgroundColor = backgroundColor;
    document.querySelector('h2').style.color = headerColor;
    alert('Page customized successfully');
}

// Update the admin panel display function to include new donors and customization options
function showAdminPanel() {
    const adminDonorList = document.getElementById('adminDonorList');
    adminDonorList.innerHTML = '';
    
    users.forEach(user => {
        if (user.type === 'donor') {
            const li = document.createElement('li');
            li.textContent = `${user.username} - ${user.bloodType} - ${user.phoneNumber} - ${user.email} - ${user.location}`;
            adminDonorList.appendChild(li);
        }
    });
    
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('donorPanel').style.display = 'none';
    document.getElementById('patientPanel').style.display = 'none';
    document.getElementById('donorSearch').style.display = 'none';
}
