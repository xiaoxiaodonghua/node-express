const express = require('express'),
    router = express.Router(),
    AdminUser = require('../../models/admin_user'),
    utils = require('../../tools/utils')

// 分页显示管理员信息
router.get('/', (req, res) => {
    let page = 1; // 当前页码
    if (req.query.page) {
        page = Number(req.query.page);
    }
    // 如果page是数字， page || 1 运算结果是page
    // 如果page是undefined，page || 1 运算结果是1

    // 分页基数为5：即每次显示5个学生
    var pageSize = 10

    AdminUser.find().count((err, total) => {
        // 学生总数
        // console.log("共有学生：" + total)
        if (err) {
            // 跳转到错误页面
        } else {
            // 统计应该分几页
            // 如果total / pageSize除不尽，需要向上取整
            var pageCount = Math.ceil(total / pageSize)
                // console.log(pageCount)
                // skip()：跳过
                // limit()：限制
            AdminUser.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .select()
                .exec((err, data) => {
                    if (err) {

                    } else {
                        // 把查询到的数据返回给客户端

                        res.render('admin/user/index', {
                            list: data,
                            pages: utils.getPages(page, pageCount), //页面中显示的分页页码
                            pageCount, //总页数
                            page: page, //当前页码
                            total: total
                        });
                    }
                })
        }
    })
})

// 管管理员新增---------------------------------------------
router.get('/add', (req, res) => {
    if (!req.query.id) {
        let model = new AdminUser(),
            isedit = false
        res.render('admin/user/add', {
            model,
            isedit
        })
    } else {
        res.send('路径错误')
    }
})
router.post('/add', (req, res) => {
    var model = new AdminUser(req.body)
    if (model.name.trim() == '') {
        res.json({ status: 'n', msg: '姓名不能为空' })
        return
    }
    if (model.user_name.trim() == '') {
        res.json({ status: 'n', msg: '用户名不能为空' })
        return
    }
    if (model.user_pwd.trim() == '') {
        res.json({ status: 'n', msg: '密码不能为空' })
        return
    }
    if (model.email.trim() == '') {
        res.json({ status: 'n', msg: '邮箱不能为空' })
        return
    }
    AdminUser.validateUserName(model, function(isok) {
        if (isok) {
            model.user_pwd = utils.md5(model.user_pwd)
            model.save()
                .then(data => {
                    console.log(data)
                    res.json({ status: 'y', msg: '注册成功' })
                        // res.redirect('/admin/users')
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            res.json({ status: 'n', msg: '邮箱或者用户名已经存在' })
        }

    })
})

//--------------------------管理员删除-------------------------------
router.post('/remove', (req, res) => {
    AdminUser.findByIdAndRemove(req.body.id).then(data => {
        res.redirect('/admin/users')
    })
})

//--------------------------管理员修改-------------------------------
router.get('/edit', (req, res) => {
    if (req.query.id) {
        AdminUser.findById(req.query.id)
            .then(model => {
                res.render('admin/user/add', {
                    model: model,
                    isedit: true
                })
            })
    } else {
        res.send('路径错误')
    }

})
router.post('/edit/:id', (req, res) => {
    AdminUser.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.json({ status: 'y', msg: '修改成功' })
    }).catch(err => {
        res.send(err)
    })

})

module.exports = router