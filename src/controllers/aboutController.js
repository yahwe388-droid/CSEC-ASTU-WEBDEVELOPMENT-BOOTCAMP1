const getAbout = (req, res) => {
    res.json({
        message: "About Express MVC Server",
        status: "success",
        data: {
            description: "A simple Express.js server following MVC pattern",
            version: "1.0.0",
            author: "Express MVC Team",
            features: [
                "MVC Architecture",
                "JSON Response Handling",
                "Dynamic Data Endpoints",
                "Request Validation"
            ]
        }
    });
};

module.exports = { getAbout };