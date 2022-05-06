const express = require('express')
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getProjects)

router.route('/:id').get(protect, getProject).put(protect, updateProject)

router.route('/create').post(protect, createProject)

route.route('/delete/:id').delete(protect, updateProject)
