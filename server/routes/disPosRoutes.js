const express = require('express')
const {getDisplayPositions, getDisplayPosition, createDisplayPosition, updateDisplayPosition} = require('../controllers/disPosController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/positions').get(protect, getDisplayPositions)

router.route('/positions/:id').get(protect, getDisplayPosition).put(protect, updateDisplayPosition)

router.route('/positions/create').post(protect, createDisplayPosition)

