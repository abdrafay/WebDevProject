const Project = require('../models/projectModel')
const Task = require('../models/taskModel')
const short = require('short-uuid');
const translator = short(); // Defaults to flickrBase58

/**
 * @desc Get all projects of a user
 * @route GET /api/projects
 * @param {string} token
 * @returns {object} projects
 * @access Private
 */
const getProjects = async (req, res) => {
    const projects = await Project.find({
        user: req.user._id
    })
    if(projects) {
        res.json({
            projects
        })
    } else {
        res.status(400)
        throw new Error('Projects not found')
    }
}

/**
 * @desc Get a project by id
 * @route GET /api/projects/:id
 * @param {string} token
 * @returns {object} project
 * @access Private
 */
const getProject = async (req, res) => {
    const project = await Project.findById(req.params.id)
    if(project) {
        res.json({
            project
        })
    } else {
        res.status(400)
        throw new Error('Project not found')
    }
}

/**
 * @desc Create a project
 * @route POST /api/projects/create
 * @param {string} name
 * @param {string} description
 * @param {string} user
 * @returns {object} project
 * @access Private
 */
const createProject = async (req, res) => {
    key = translator.new()
    let arr = []
    // get user details with id 
    const user = await User.findById(req.user._id)
    let name = "Admin"
    if(user) {
        // get user roles with id
    const role = await Role.findOne({ name })
    arr.push({
        user: req.user._id,
        role: role._id
    })
    }
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        users: arr,
        key: key
    })
    const createdProject = await project.save()
    if(createdProject) {
        res.json({
            createdProject
        })
    } else {
        res.status(400)
        throw new Error('Project not created')
    }
}

/**
 * @desc Update a project
 * @route PUT /api/projects/:id
 * @param {string} name
 * @param {string} description
 * @param {string} user
 * @param {array} tasks - array of tasks - optional
 * @returns {object} project
 * @access Private
 */

const updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        users: req.users,
        tasks: req.body.tasks || []
    })
    if(project) {
        res.json({
            project
        })
    } else {
        res.status(400)
        throw new Error('Project not updated')
    }
}

/**
 * @desc Delete a project
 * @route DELETE /api/projects/delete/:id
 * @param {string} id
 * @returns {object} project
 * @access Private
 */
const deleteProject = async (req, res) => {
    // find tasks and delete tasks by project id
    const tasks = await Task.find({
        project: req.params.id
    })
    if(tasks) {
        tasks.forEach(async task => {
            await Task.findByIdAndDelete(task._id)
        })
    }
    const project = await Project.findByIdAndDelete(req.params.id)
    try {
        res.send({
            data: project,
            message: 'Project deleted'
        })
    } catch (error) {
        res.status(400)
        throw new Error('Project not deleted')
    }
}

/**
 * @desc Add a user to a project
 * @route POST /api/projects/:id/addUser
 * @param {string} id
 * @param {string} user
 * @returns {object} project
 */
const addUser = async (req, res) => {
    const project = await Project.findById(req.params.id)
    if(project) {
        const user = await User.findById(req.body.user)
        if(user) {
            let name = "User"
            // const updUser = await User.findByIdAndUpdate(user._id, {
            //     projects: [...user.projects, {
            //     }]
            // }, (err, data) => {
            //     if(err) {
            //         throw new Error('User not added')
            //     } else {
            //         console.log('User added')
            //     }
            // })

            const role = await Role.findOne({ name })
            project.users.push({
                user: req.user._id,
                role: role._id,
                status: 'pending'
            })
            await user.save()
            // add this project to the user
            await project.save()
            res.json({
                project
            })
        } else {
            res.status(400)
            throw new Error('User not found')
        }
    } else {
        res.status(400)
        throw new Error('Project not found')
    }
}


module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    addUser,
    
}
