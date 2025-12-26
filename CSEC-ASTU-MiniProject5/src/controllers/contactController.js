const getContact = (req, res) => {
    res.json({
        message: "Contact Information",
        status: "success",
        data: {
            email: "kebi12447@gmail.com",
            support: "support@express-mvc.com",
            phone: "+2519-14-27-30-91",
            address: "Adama, Oromia, Ethiopia", 
            hours: "Mon-Fri: 9AM-5PM"
        }
    });
};

module.exports = { getContact };