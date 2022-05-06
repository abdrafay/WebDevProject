const mongoose = require('mongoose')

const taskStatusSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'TaskStatus'
        },
        timeLog:{
            type: String,
        }
    },
    {
        timestamps: true
    }
)
const TaskStatus = mongoose.model('TaskStatus', taskStatusSchema)
const Task = mongoose.model('Task', taskSchema)
module.exports = {Task, TaskStatus}
