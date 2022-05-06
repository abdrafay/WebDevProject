const express = require('express')
router = express.Router()
const {getRoles, getRole, createRole, deleteRole, updateRole } = require('../controllers/roleController')
const {protect} = require('../middleware/authMiddleware')
const router = require('./userRoutes')

router.route('/roles').get(protect, getRoles)

router.route('/roles/:id').get(protect, getRole).put(protect, updateRole)

router.route('/roles/create').post(protect, createRole)

router.route('/roles/delete/:id').delete(protect, deleteRole)