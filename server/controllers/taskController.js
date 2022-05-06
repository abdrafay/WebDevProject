const Task = require('../models/task')
const Project = require('../models/project')
const User = require('../models/user')


/**
 * @desc Get All Tasks of a project
 * @route GET /api/projects/:id/tasks
 * @param {string} id
 * @returns {object} tasks
 * @access Private
 */
const getTasks = async (req, res) => {
    const tasks = await Task.find({
        project: req.params.id
    })
    if(tasks) {
        res.json({tasks})
    } else {
        res.status(400)
        throw new Error('Tasks not found')
    }
}

/**
 * @desc Get a task by id
 * @route GET /api/projects/tasks/:id
 * @param {string} id
 * @returns {object} task
 * @access Private
 */
const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(task) {
        res.json({task})
    }
    else {
        res.status(400)
        throw new Error('Task not found')
    }
}

/**
 * @desc Create a task
 * @route POST /api/projects/:id/tasks/create
 * @param {string} name
 * @param {string} description
 * @param {string} project
 * @returns {object} task
 * @access Private
 */
const createTask = async (req, res) => {
    const task = await Task.create({
        name: req.body.name,
        description: req.body.description,
        project: req.params.id
    })
    if(task) {
        
        const project = await Project.findByIdAndUpdate(req.params.id, {
            $push: {
                tasks: task
            }
        })
        if(project) {
            res.json({"task": task, "project": project})
        }
    }else {
        res.status(400)
        throw new Error('Task not found')
    }
    // add this task to the corresponding project
    
    
}

/**
 * @desc Update a task
 * @route PUT /api/projects/:id/tasks/:tid
 * @param {string} name
 * @param {string} description
 * @param {string} project
 * @param {string} timeLog
 * @returns {object} task
 * @access Private
 */
const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.tid, {
        name: req.body.name,
        description: req.body.description,
        project: req.params.id,
        timeLog: req.body.timeLog
    })
    if(task) {
        // update the task in the project also
        const project = await Project.findByIdAndUpdate({"_id": req.params.id, "tasks._id": task._id}, {
            $set: {
                "tasks.$": task
            }
        } )
        res.json({"Task": task, "Project": project})
    }
    else {
        res.status(400)
        throw new Error('Task not found')
    }
}

/**
 * @desc Delete a task
 * @route DELETE /api/projects/:id/tasks/:id
 * @param {string} id
 * @returns {object} task
 * @access Private
 */
const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    // delete from project also
    const project = await Project.findByIdAndDelete(req.params.id, {
        $pull: {
            tasks: task
        }
    })

    if(task) {
        res.json({task})
    }
    else {
        res.status(400)
        throw new Error('Task not found')
    }
}


module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}
