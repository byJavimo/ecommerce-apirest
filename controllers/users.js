'use strict'

const User = require('../models/users')

// Register users into the data base

function signInUser (req, res) {
    console.log('POST /api/product')
    console.log(req.body)

    let user = new User()

    user.name = req.body.name
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.password = req.body.password
    user.postalCode = req.body.postalCode
    user.address = req.body.address

    user.save(function (err, userSignedIn) {
        if (err) res.status(500).send({message: `Error sign in current user in data base: ${err}`})

        res.status(200).send({user: userSignedIn})
    })
}

// Update user profile data

function updateUserData (req, res) {
    let userId = req.params.userId
    let update = req.body.params

    User.findByIdAndUpdate(userId, update,  function(err, userUpdated){
        if (err) return res.status(500).send({message: `Error when making changes in the user profile: ${err}`})

        res.status(200).send({user: userUpdated})

    })
}

// Retrieve specific user in the data base

function getUser (req, res) {
    let userId = req.params.userId

    User.findById(userId, function(err, user){
        if (err) return res.status(500).send({message: `Error when making request: ${err}`})
        if (!user) return res.status(400).send({message: 'User does not exist'})

        res.status(200).send({user: user})
    })
}

// Remove a specific product in the data base

function removeUser(req, res) {
    let userId = req.params.userId

    User.findById(userId, function (err, user) {
        if (err) return res.status(500).send({message: `Error when trying to delete user: ${err}`})

        user.remove(function (err){
            if (err) return res.status(500).send({message: `Error when trying to user product: ${err}`})
            res.status(200).send({message: 'The user have been deleted succesfully'})
        })
    })
}

module.exports = {
    signInUser,
    updateUserData,
    getUser,
    removeUser
}