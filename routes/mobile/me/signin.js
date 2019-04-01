const express = require('express'),
    router = express.Router(),
    Member = require('../../../models/member'),
    utils = require('../../../tools/utils')

router.get('/', (req, res) => {
    res.render('mobile/me/signin', { navIndex: 3 })
})
router.post('/', (req, res) => {
    Member.findOne({ $or: [{ user_name: req.body.userName }, { email: req.body.userName }, { mobile: req.body.userName }] }).then(u => {
        if (u) {
            var strPwd = req.body.user_pwd

            strPwd = utils.md5(strPwd)
            if (strPwd == u.user_pwd) {
                console.log(u)
                res.cookie('memberImg', u.img)
                res.cookie('memberEmail', u.email)
                res.cookie('member', u.user_name)
                res.json({ status: 'y', msg: '登录成功' })
            } else {
                res.json({ status: 'n', msg: '密码错误,请重新输入' })
            }
        } else {
            res.json({ status: 'n', msg: '用户信息错误' })
        }
    })
})
module.exports = router