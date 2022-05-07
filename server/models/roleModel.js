const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const roleSchema = mongoose.Schema(
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
const Role = mongoose.model('Role', roleSchema)
module.exports = Role
