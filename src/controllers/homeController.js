const getHome = (req, res) => {
    res.json({
        message: "Welcome to Express MVC Server!",
        status: "success",
        data: {
            routes: {
                home: "/",
                about: "/about",
                contact: "/contact",
                time: "/api/time",
                echo: "/api/echo"
            }
        }
    });
};

module.exports = { getHome };