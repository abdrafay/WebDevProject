const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

/**
 * @desc Auth User & Get Token
 * @route POST /api/users/login
 * @param {string} email
 * @param {string} password
 * @returns {object} user
 * @access Public
 */
const authUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isMatch = await user.matchPassword(password)
    if (!user) {
        return res.status(400).json({ msg: 'User not found' })
    }
    if (isMatch) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            projects: user.projects,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Credentials')
    }
}

/**
 * @desc Register a new User
 * @route POST /api/users
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} avatar
 * @param {array} projects
 * @returns {object} user
 */

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, avatar } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists' )
    }
    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        avatar: avatar || '',
    })
    if(user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar || '',
            projects: user.projects,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}

/**
 * @desc Get User Profile
 * @route GET /api/users/profile
 * @param {string} token
 * @returns {object} user
 * @access Private
 */

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            projects: user.projects,
        })
    } else {
        res.status(400)
        throw new Error('User not found')
    }
}

/**
 * @desc Update User Profile
 * @route PUT /api/users/profile
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @param {string} avatar
 * @param {array} projects
 * @returns {object} user
 * @access Private
 */

const updateUserProfile = async (req, res) => {
    const { firstName, lastName, email, password, project, role, tasks } = req.body
    const user = await User.findById(req.user._id)
    let tsk = []
    let prj = []
    if(project) {
        prj.push({
            project: project._id,
            role,
            tasks: tsk       
        })
    } else {
        prj = user.projects
    }
    if(tasks) {
        tasks.map(task => {
            tsk.push({
                task: task._id
            })
        })
    } else {
        user.projects.map(project => {
            tsk.push({
                task: project.task
                })
        })

    }
    

    if(user) {
        user.firstName = firstName || user.firstName
        user.lastName = lastName || user.lastName
        user.email = email || user.email
        user.avatar = avatar || user.avatar
        user.projects = prj
        // add projects to user
        if(password) {
            user.password = password
        }
        const updatedUser = await user.save()
        if(updatedUser) {
            res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                avatar: updatedUser.avatar,
                projects: updatedUser.projects,
                token: generateToken(updatedUser._id)
            })
        }
    } else {
        res.status(400)
        throw new Error('User not found')
    }
}   


module.exports = { authUser, registerUser, getUserProfile, updateUserProfile  }