const Project = require('../models/projectModel')
const Task = require('../models/taskModel')

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
    const project = await Project.create({
        name: req.body.name,
        description: req.body.description,
        user: req.user._id
    })
    if(project) {
        res.json({
            project
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
        user: req.user._id,
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

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}
