const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
    username: String
}, {
    timestamps: true
})


const Task = mongoose.model("Task", TaskSchema)

module.exports = Task