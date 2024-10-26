// Import required modules
const express = require('express');
const path = require('path');
const session = require('express-session'); // Import express-session

// Initialize Express app
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your_secret_key', // Change this to a strong secret in production
  resave: false,
  saveUninitialized: true,
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Simple authentication
const USERNAME = 'admin'; // Set your username here
const PASSWORD = 'password'; // Set your password here

// Route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    req.session.authenticated = true; // Set authentication status
    res.redirect('/'); // Redirect to main page
  } else {
    res.send('Invalid username or password'); // Send error message
  }
});

// Route to serve the main HTML file
app.get('/', (req, res) => {
  if (req.session.authenticated) {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve main page if authenticated
  } else {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Serve login page if not authenticated
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error logging out');
    }
    res.redirect('/'); // Redirect to login after logout
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
