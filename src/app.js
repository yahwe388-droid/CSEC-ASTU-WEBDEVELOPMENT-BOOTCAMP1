const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Import routes
const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dataRoutes = require('./routes/dataRoutes');
const jsonRoutes = require('./routes/jsonRoutes');

// Route definitions
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/api/time', dataRoutes);
app.use('/api/echo', jsonRoutes);

// Handle unknown routes (404 handler)
app.use('*', (req, res) => {
    res.status(404).json({
        message: "Route not found",
        status: "error",
        error: `Cannot ${req.method} ${req.originalUrl}`,
        availableRoutes: [
            { path: "/", methods: ["GET"] },
            { path: "/about", methods: ["GET"] },
            { path: "/contact", methods: ["GET"] },
            { path: "/api/time", methods: ["GET"] },
            { path: "/api/echo", methods: ["POST"] }
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal server error",
        status: "error",
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
    });
});

module.exports = app;