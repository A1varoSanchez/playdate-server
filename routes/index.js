module.exports = app => {

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const eventRoutes = require("./event.routes")
    app.use("/api/event", eventRoutes)

    const userRoutes = require("./user.routes")
    app.use("/api/user", userRoutes)

    const userChat = require("./chat.routes")
    app.use("/api/chat", userChat)

    const uploadRoutes = require("./upload.routes")
    app.use("/api/upload", uploadRoutes)
}