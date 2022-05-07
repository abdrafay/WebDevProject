const {Task, TaskStatus} = require('../models/taskModel')
const Project = require('../models/projectModel')


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
    // get todo task status
    const status = await TaskStatus.findOne({
        name: 'Todo'
    })
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        project: req.params.id,
        status: status._id,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        nature: req.body.nature,
        user: req.params.user || null
    })
    const createdTask = await task.save()
    if(createdTask) {
        // const project = await Project.findByIdAndUpdate(req.params.id, {
        //     $push: {
        //         tasks: task
        //     }
        // })

        const project = await Project.findById(req.params.id)
        project.tasks.push({
            _id: createdTask._id
        })
        const updatedProject = await project.save()
        if(updatedProject && createdTask) {
            res.json({"task": createdTask, "project": updatedProject})
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
 * @param {Date} startTime
 * @param {Date} endTime
 * @returns {object} task
 * @access Private
 */
const updateTask = async (req, res) => {
    // const task = await Task.findByIdAndUpdate(req.params.tid, {
    //     name: req.body.name,
    //     description: req.body.description,
    //     project: req.params.id,
    // })
    const task = await Task.findById(req.params.tid)
    if(task) {
        task.startTime = req.body.startTime,
        task.endTime = req.body.endTime
    }
    const updatedTask = await task.save()
    if(updatedTask) {
        res.json({updatedTask})
    }
    else {
        res.status(400)
        throw new Error('Task not found')
    }
}

/**
 * @desc Delete a task
 * @route DELETE /api/projects/:id/tasks/:tid
 * @param {string} id
 * @param {string} tid
 * @returns {object} task
 * @access Private
 */
const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.tid)
    // delete from project also
    // const project = await Project.findByIdAndDelete(req.params.id, {
    //     $pull: {
    //         tasks: task
    //     }
    // })
    if(task) {
        const project = await Project.findById(req.params.id)
        project.tasks.forEach(tsk => {
            if(tsk._id === req.params.tid) {
                // project.tasks.({_id: tsk._id})
                project.tasks = project.tasks.filter(tsk => tsk._id !== req.params.tid)
            }
        })
        const updatedProject = await project.save()
        res.json("Task Deleted", {updatedProject})
    }
    else {
        res.status(400)
        throw new Error('Task not found')
    }
}

/**
 * @desc Get all task Status
 * @route GET /api/projects/tasks/status/:id
 * @param {string} id
 * @returns {object} taskStatus
 */

const getTaskStatus = async (req, res) => {
    const taskStatus = await TaskStatus.findOne({
        name: req.params.id
    })
    if(taskStatus) {
        res.json({taskStatus})
    } else {
        res.status(400)
        throw new Error('Task Status not found')
    }
}


module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getTaskStatus
}
