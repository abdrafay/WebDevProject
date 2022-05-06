const express = require('express')
const {getDisplayPositions, getDisplayPosition, createDisplayPosition, updateDisplayPosition} = require('../controllers/disPosController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getDisplayPositions)

router.route('/:id').get(protect, getDisplayPosition).put(protect, updateDisplayPosition)

router.route('/create').post(protect, createDisplayPosition)

