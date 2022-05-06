const express = require('express')
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/projects').get(protect, getProjects)

router.route('/projects/:id').get(protect, getProject).put(protect, updateProject)

router.route('/projects/create').post(protect, createProject)

route.route('/projects/delete/:id').delete(protect, updateProject)
