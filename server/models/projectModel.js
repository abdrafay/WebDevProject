const mongoose = require('mongoose')
const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        key: {
            type: String,
            required: true
        },
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                role: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Role'
                },
                status: {
                    type: String,
                    required: true
                }
            }
        ],
        tasks: [
            {
                task: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Task'
                }
                
            }
        ]},
    {
        timestamps: true
    }
)
const Project = mongoose.model('Project', projectSchema)

module.exports = Project