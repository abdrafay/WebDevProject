const express = require('express')
const {getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask} = require('../controllers/taskController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/projects/:id/tasks').get(protect, getTasks)

router.route('/projects/tasks/:id').get(protect, getTask)

router.route('/projects/:id/tasks/:tid').put(protect, updateTask)

router.route('/projects/:id/tasks/create').post(protect, createTask)

router.route('/projects/tasks/delete/:id').delete(protect, deleteTask)