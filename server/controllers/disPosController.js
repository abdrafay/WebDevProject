const DisplayPosition = require('../models/disPosModel')
const Project = require('../models/projectModel')
const Task = require('../models/taskModel')
const User = require('../models/userModel')
const Role = require('../models/roleModel')

/**
 * @desc Get all DisplayPositionsProjects of a user
 * @route GET /api/positions
 * @param {string} token
 * @returns {object} projects
 * @access Private
 */

const getDisplayPositions = async (req, res) => {
    const displayPositions = await DisplayPosition.find({
        user: req.user._id
    })
    if(displayPositions) {
        res.json({
            displayPositions
        })
    } else {
        res.status(400)
        throw new Error('DisplayPositions not found')
    }
}

/**
 * @desc Get a DisplayPosition by id
 * @route GET /api/positions/:id
 * @param {string} token
 * @returns {object} project
 * @access Private
 */
const getDisplayPosition = async (req, res) => {
    const displayPosition = await DisplayPosition.findById(req.params.id)
    if(displayPosition) {
        res.json({
            displayPosition
        })
    } else {
        res.status(400)
        throw new Error('DisplayPosition not found')
    }
}

// display positions can be added by just adding the project id to the display position
/**
 * @desc Create a DisplayPosition
 * @route POST /api/positions/create
 * @param {string} project
 * @returns {object} project
 * @access Private
 */
const createDisplayPosition = async (req, res) => {
    const displayPosition = await DisplayPosition.create({
        user: req.user._id,
        projects: req.body.projects
    })
    if(displayPosition) {
        res.json({
            displayPosition
        })
    } else {
        res.status(400)
        throw new Error('DisplayPosition not found')
    }
}

/**
 * @desc Update a DisplayPosition
 * @route PUT /api/positions/:id
 * @param {string} project
 * @returns {object} project
 * @access Private
 */
const updateDisplayPosition = async (req, res) => {
    const displayPosition = await DisplayPosition.findByIdAndUpdate(req.params.id, {
        projects: req.body.projects
    })
    if(displayPosition) {
        res.json({
            displayPosition
        })
    } else {
        res.status(400)
        throw new Error('DisplayPosition not found')
    }
}

moudule.exports = {
    getDisplayPositions,
    getDisplayPosition,
    createDisplayPosition,
    updateDisplayPosition
}
