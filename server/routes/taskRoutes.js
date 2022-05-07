const express = require('express')
const {getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask} = require('../controllers/taskController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/:id/tasks').get(protect, getTasks)

router.route('/tasks/:id').get(protect, getTask)

router.route('/:id/tasks/:tid').put(protect, updateTask)

router.route('/:id/tasks/create').post(protect, createTask)

router.route('/:id/tasks/delete/:tid').delete(protect, deleteTask)

module.exports = router