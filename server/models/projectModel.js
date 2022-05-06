const monggoose = require('mongoose')
const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                name: String,
                required: true,
                ref: 'User',
                role: {
                    type: mongoose.Schema.Types.ObjectId,
                    name: String,
                    required: true,
                    ref: 'Role'
                }
            }
        ]
    },
    {
        timestamps: true
    }
)
const Project = mongoose.model('Project', projectSchema)