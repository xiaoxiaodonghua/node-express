const express = require('express'),
    router = express.Router(),
    Member = require('../../../models/member'),
    utils = require('../../../tools/utils')

router.get('/', (req, res) => {
    res.render('mobile/me/register', { navIndex: 3 })
})
router.post('/', (req, res) => {
    var model = new Member(req.body)
    if (model.name == '') {
        res.json({ status: 'n', msg: '姓名不能为空' })
        return
    }
    if (model.user_name == '') {
        res.json({ status: 'n', msg: '用户名不能为空' })
        return
    }
    if (model.user_pwd == '') {
        res.json({ status: 'n', msg: '密码不能为空' })
        return
    }
    if (model.email == '') {
        res.json({ status: 'n', msg: '邮箱不能为空' })
        return
    }
    if (model.mobile == '') {
        res.json({ status: 'n', msg: '手机号不能为空' })
        return
    }
    if (model.img == '') {
        res.json({ status: 'n', msg: '头像不能为空' })
        return
    }
    if (model.nick_name == '') {
        res.json({ status: 'n', msg: '昵称不能为空' })
        return
    }
    Member.validateUserName(model, function(isok) {
        if (isok) {
            model.user_pwd = utils.md5(model.user_pwd)
            model.save()
                .then(data => {
                    // console.log(data)
                    res.json({ status: 'y', msg: '注册成功' })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            res.json({ status: 'n', msg: '邮箱、用户名或者用户名已经存在' })
        }
    })
})
module.exports = router