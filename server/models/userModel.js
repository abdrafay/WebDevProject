const mongoose = require('monggoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
        projects: [{
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
            },
            tasks: [
                {
                    task: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Task'
                    }
                }
            ],
            role: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            },
        }]
    },
    {
        timestamps: true
    }
)
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
      next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)
module.exports = User