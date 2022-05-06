const express = require('express')
router = express.Router()
const {getRoles, getRole, createRole, deleteRole, updateRole } = require('../controllers/roleController')
const {protect} = require('../middleware/authMiddleware')
const router = require('./userRoutes')

router.route('/').get(protect, getRoles)

router.route('/:id').get(protect, getRole).put(protect, updateRole)

router.route('/create').post(protect, createRole)

router.route('/delete/:id').delete(protect, deleteRole)