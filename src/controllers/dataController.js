const getDynamicData = (req, res) => {
    const now = new Date();
    const hours = now.getHours();
    
    let greeting;
    if (hours < 12) {
        greeting = "Good morning!";
    } else if (hours < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }
    
    res.json({
        message: "Dynamic Data Response",
        status: "success",
        data: {
            currentTime: now.toISOString(),
            timestamp: now.getTime(),
            localTime: now.toLocaleString(),
            greeting: greeting,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' })
        }
    });
};

module.exports = { getDynamicData };