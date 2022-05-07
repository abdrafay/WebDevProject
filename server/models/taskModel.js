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
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        nature: {
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
            ref: 'User'
        },
        status: {
            type: String,
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
