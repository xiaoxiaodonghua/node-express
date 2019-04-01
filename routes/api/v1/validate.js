const express = require('express'),
    router = express.Router(),
    AdminUser = require('../../../models/admin_user'),
    Member = require('../../../models/member')

// 验证用户名是否存在
router.get('/admin_user_name', (req, res) => {
        // console.log(req.query)
        AdminUser.count({ user_name: req.query.user_name }).then(data => {
            if (data > 0) {
                res.send(false)
            } else {
                res.send(true)
            }
        }).catch(err => {
            res.send(err)
        })
    })
    // ---------------------
    // 验证用户名是否存在
router.get('/member_user_name', (req, res) => {
    console.log(req.query)
    Member.count({ user_name: req.query.user_name }).then(data => {
        if (data > 0) {
            res.send(false)
        } else {
            res.send(true)
        }
    }).catch(err => {
        res.send(err)
    })
})
router.get('/member_email', (req, res) => {
    // console.log(req.query)
    Member.count({ email: req.query.email }).then(data => {
        if (data > 0) {
            res.send(false)
        } else {
            res.send(true)
        }
    }).catch(err => {
        res.send(err)
    })
})
router.get('/member_mobile', (req, res) => {
    // console.log(req.query)
    Member.count({ mobile: req.query.mobile }).then(data => {
        if (data > 0) {
            res.send(false)
        } else {
            res.send(true)
        }
    }).catch(err => {
        res.send(err)
    })
})
module.exports = router