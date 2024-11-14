const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')



var xuserId, xuserName, xEmail;


/**
 * Get All User 
 */

// router.get('/', async (req, res) => {
//     try {
//         if (req.body.isAdmin) {

//             try {
//                 const user = await User.find();
//                 res.status(200).json(user);

//             } catch (err) {
//                 throw new Error(err)
//             }

//         } else {
//             return res.status(403).json('You have not Permisssion To get All User Account')
//         }

//     } catch (err) {
//         return res.status(500).json(err)
//     }
// })


/**
 * Get a User 
 */

// router.get('/:id', async (req, res) => {
//     try {
//         // if (req.body.userId === req.params.id || req.body.isAdmin) {

//         try {

//             const user = await User.findById(req.params.id);

//             // const { username, email, ...other } = user._doc
//             // res.status(200).json({ username, email })
//             res.status(200).json(user);

//         } catch (err) {
//             throw new Error(err)
//         }

//         // } else {
//         //     return res.status(403).json('You can get Only Your Account')
//         // }

//     } catch (err) {
//         return res.status(500).json(err)
//     }
// })


router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId
        const username = req.query.username
        try {

            const user = userId
                ? await User.findById(userId)
                : await User.findOne({ username: username });

            res.status(200).json(user);

        } catch (err) {
            throw new Error(err)
        }



    } catch (err) {
        return res.status(500).json(err)
    }
})


/**
 * Get Friends
 */

router.get('/friends/:userId', async (req, res) => {
    try {
        const usr = await User.findById(req.params.userId);
        const friends = await Promise.all(
            usr.following.map(friendId => {
                return User.findById(friendId)
            })
        );

        const friendList = [];

        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });

        return res.status(200).json(friendList)

    } catch (err) {
        return res.status(500).json(err)
    }
})

/**
 * Update User 
 */
router.put('/:id', async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {

            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    return res.status(500).json(err);
                }
            }
            try {

                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                })
                res.status(200).json("Account Updated Successfully !!")
            } catch (err) {
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json('You Can Update Only Your Account')
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

/**
 * Delete User 
 */
router.delete('/:id', async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {

            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account Deleted SuccessFully')

        } catch (err) {
            console.log("001")
            return res.status(500).json(err);
        }
    } else {
        console.log('002')

        return res.status(403).json('You can Delete Only Your Account !')
    }


})

/**
 * Follow A User 
 */
router.put("/:id/follow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {

            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            const userEmail = user.email

            if (!user.followers.includes(req.body.userId)) {

                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })


                res.status(200).json(`Now Your are Following ${userEmail}`)
            } else {
                return res.status(403).json(`You are Already Following This - ${userEmail} -user`)
            }

        } else {
            return res.status(403).json("You Can't Follow YourSelft !!")
        }

    } catch (error) {
        return res.status(500).json(error)
    }
})

/**
 * Unfollow User 
 */
router.put("/:id/unfollow", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {

            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            const userEmail = user.email

            if (user.followers.includes(req.body.userId)) {

                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { following: req.params.id } })


                res.status(200).json(`Now Your UnFollowed - ${userEmail}`)
            } else {
                return res.status(403).json(`You are Not Following This - ${userEmail} -user So you Can't Unfollow`)
            }

        } else {
            return res.status(403).json("You Can't unFollow YourSelft !!")
        }

    } catch (error) {
        return res.status(500).json(error)
    }
})




module.exports = router
