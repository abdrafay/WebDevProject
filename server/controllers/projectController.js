const Project = require('../models/projectModel')
const User = require('../models/userModel')
const Role = require('../models/roleModel')
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
        res.json(
            projects
        )
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
            _id: project._id,
            name: project.name,
            description: project.description,
            users: project.users,
            key: project.key,
            tasks: project.tasks
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
    const role = await Role.findOne({ name })
if(user) {
        arr.push({
            _id: req.user._id,
            role: role._id,
            status: 'joined'
        })
    }
    const project = new Project({
        name: req.body.name,
        description: req.body.description,
        users: arr,
        key: key
    })
    user.projects.push({
        _id: project._id,
        role: role._id,
    })
    const createdProject = await project.save()
    await user.save()
    if(createdProject) {
        res.json({
            _id: createdProject._id,
            name: createdProject.name,
            description: createdProject.description,
            users: createdProject.users,
            key: createdProject.key,
            tasks: createdProject.tasks
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
 * @returns {object} project
 * @access Private
 */

const updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id)
    if(project) {
        project.name = req.body.name
        project.description = req.body.description
    } else {
        res.status(400)
        throw new Error('Project not found')
    }
    const updatedProject = await project.save()

    if(updatedProject) {
        res.json({
            updatedProject
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
