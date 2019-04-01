const express = require('express'),
    router = express.Router(),
    Member = require('../../models/member'),
    utils = require('../../tools/utils')

// --------------用户信息显示-----------------
router.get('/', (req, res) => {
    let page = 1;
    if (req.query.page) {
        page = Number(req.query.page)
    }
    var pageSize = 10
    Member.find().count((err, total) => {
        if (err) {
            // 跳转到错误页面
        } else {
            var pageCount = Math.ceil(total / pageSize)
            Member.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .select()
                .exec((err, data) => {
                    if (err) {

                    } else {
                        res.render('admin/member/index', {
                            list: data,
                            pages: utils.getPages(page, pageCount), //页面中显示的分页页码
                            pageCount, //总页数
                            page: page, //当前页码
                            total: total
                        })
                    }
                })
        }
    })
})

//-----------------用户信息新增-------------
router.get('/add', (req, res) => {
    if (!req.query.id) {
        let model = new Member(),
            isedit = false
        res.render('admin/member/add', {
            model,
            isedit
        })
    }
})
router.post('/add', (req, res) => {
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

//----------------用户信息删除------------------
router.post('/remove', (req, res) => {
    Member.findByIdAndRemove(req.body.id).then(data => {
        res.redirect('/admin/members')
    })
})

// --------------------用户信息修改-------------
router.get('/edit', (req, res) => {
    if (req.query.id) {
        Member.findById(req.query.id)
            .then(model => {
                res.render('admin/member/add', {
                    model: model,
                    isedit: true
                })
            })
    } else {
        res.send('路径错误')
    }
})

router.post('/edit/:id', (req, res) => {
    Member.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.json({ status: 'y', msg: '修改成功' })
    }).catch(err => {
        res.send(err)
    })

})
module.exports = router