const express = require('express')
const { getProjects, getProject, createProject, updateProject, deleteProject, joinProject, addUser } = require('../controllers/projectController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getProjects)

router.route('/:id').get(protect, getProject).put(protect, updateProject)

router.route('/create').post(protect, createProject)

router.route('/delete/:id').delete(protect, updateProject)

router.route('/join').post(protect,joinProject)

router.route('/:id/user/add').post(protect, addUser)
module.exports = router