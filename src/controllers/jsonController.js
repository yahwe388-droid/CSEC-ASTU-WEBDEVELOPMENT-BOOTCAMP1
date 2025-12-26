const echoJson = (req, res) => {
    // Validate request body exists and is an object
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Invalid request body",
            status: "error",
            error: "Please provide valid JSON data in the request body"
        });
    }
    
    res.json({
        message: "JSON data received successfully",
        status: "success",
        data: req.body,
        metadata: {
            receivedAt: new Date().toISOString(),
            contentType: req.get('Content-Type'),
            dataSize: JSON.stringify(req.body).length
        }
    });
};

module.exports = { echoJson };