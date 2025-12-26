const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Start server
app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    console.log(`📌 Available routes:`);
    console.log(`   GET  /              - Welcome home`);
    console.log(`   GET  /about         - About information`);
    console.log(`   GET  /contact       - Contact details`);
    console.log(`   GET  /api/time      - Dynamic time data`);
    console.log(`   POST /api/echo      - Echo JSON data`);
});