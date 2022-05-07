const Role = require('../models/roleModel');

/**
 * @desc Get all roles
 * @route GET /api/roles
 * @returns {object} roles
 * @access Private
 */

const getRoles = async (req, res) => {
    const roles = await Role.find();
    if(roles) {
        res.json({roles})
    }
    else {
        res.status(400)
        throw new Error('Roles not found')
    }
}

/**
 * @desc Get a role by id
 * @route GET /api/roles/:id
 * @param {string} id
 * @returns {object} role
 * @access Private
 */

const getRole = async (req, res) => {
    const role = await Role.findById(req.params.id);
    if(role) {
        res.json({role})
    }
    else {
        res.status(400)
        throw new Error('Role not found')
    }
}

/** 
 * @desc Create a role
 * @route POST /api/roles/create
 * @param {string} name
 * @returns {object} role
 * @access Private
 */

const createRole = async (req, res) => {
    const role = new Role({
        name: req.body.name
    })
    const createdRole = await role.save()
    if(createdRole) {
        res.json({createdRole})
    }
    else {
        res.status(400)
        throw new Error('Role not found')
    }
}
/**
 * @desc Delete Role
 * @route DELETE /api/roles/delete/:id
 * @param {string} id
 * @returns {object} role
 * @access Private
 */

const deleteRole = async (req, res) => {
    const role = await Role.findByIdAndDelete(req.params.id);
    if(role) {
        res.json({role})
    }
    else {
        res.status(400)
        throw new Error('Role not found')
    }
}

/**
 * @desc Update Role
 * @route PUT /api/roles/:id
 * @param {string} id
 * @param {string} name
 * @returns {object} role
 * @access Private
 */


const updateRole = async (req, res) => {
    const role = await Role.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    });
    if(role) {
        res.json({role})
    }
    else {
        res.status(400)
        throw new Error('Role not found')
    }
}

module.exports = {
    getRoles,
    getRole,
    createRole,
    deleteRole,
    updateRole
}