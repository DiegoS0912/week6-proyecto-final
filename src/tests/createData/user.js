const User = require("../../models/User")

const user = async () => {
    const body = {
        firstName: "Uriel",
        lastName: "Lopez",
        email: "urilop871@gmail.com",
        password: "JH849hh",
        phone: "23948555"
    }

    await User.create(body)
}

module.exports = user