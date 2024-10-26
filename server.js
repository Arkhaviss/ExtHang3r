// Import required modules
const express = require('express');
const path = require('path');
const session = require('express-session'); // Import express-session for session management

// Initialize Express app
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Session middleware
app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: true,
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

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
