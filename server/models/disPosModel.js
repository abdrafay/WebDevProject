const mongoose = require('mongoose')
const displayPositionsSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        projects:[{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        }]
    },
    {
        timestamps: true
    }
)
const DisplayPosition = mongoose.model('DisplayPosition', displayPositionsSchema)
module.exports = DisplayPosition