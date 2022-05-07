const {getRoles, getRole, createRole, deleteRole, updateRole } = require('../controllers/roleController')
const express = require('express')
router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getRoles)

router.route('/:id').get(getRole).put(updateRole)

router.route('/create').post(createRole)

router.route('/delete/:id').delete(deleteRole)

module.exports = router