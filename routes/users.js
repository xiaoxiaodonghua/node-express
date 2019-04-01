var express = require('express');
var router = express.Router();
const User = require('../models/user'),
    Col = require('../models/col'),
    Row = require('../models/row')
    /* GET users listing. */

// ---------------------------------座次表显示------------------------
router.get('/', function(req, res) {
    const rowData = Row.find(),
        colData = Col.find(),
        userData = User.find(),
        allP = Promise.all([rowData, colData, userData])
    allP.then(([rowList, colList, users]) => {
        res.render('user/index', {
            rowList,
            colList,
            users
        })
    })
});

// ------------------------用户注册---------------------------------------
router.get('/reg', (req, res) => {
    if (!req.query.id) {
        // 在mongoose中find()返回一个Promise对象
        // 通过调用then返回成功之后的回调函数
        // Promise.all组装一个Promise对象组成的数组
        // 当数组中的所有的对象执行成功之后调用then方法
        // then中以数组的形式接收成功之后的返回值
        const rowData = Row.find(),
            colData = Col.find(),
            userData = new User(),
            allP = Promise.all([rowData, colData, userData])
            // 此处使用解构赋值的方式
            // 在js中如果属性名和属性值是同样的变量名，可以省略一个
        allP.then(([rowList, colList, user]) => {
            res.render('user/reg', {
                rowList,
                colList,
                user,
                isedit: false
            })
        })
    } else {
        res.send('路径错误')
    }

})

router.post('/reg', (req, res) => {
    const model = new User(req.body)
    User.count({
        row_id: req.body.row_id,
        col_id: req.body.col_id
    }).then(c => {
        console.log(c)
        if (c > 0) {
            res.json({ status: 'n', msg: '此位置已经有人' })
        } else {
            // res.send('此位置可以坐')
            model.save()
                .then(data => {
                    // res.send(data)
                    res.json({ status: 'y', msg: '此位置可以坐' })
                        // res.redirect('/users')
                })
                .catch(err => {
                    res.send(err)
                })
        }
    })

})

// ------------------删除个人信息------------
router.post('/remove', (req, res) => {
    User.findByIdAndRemove(req.body.id).then(data => {
        res.redirect('/users')
    })
})

// --------------------------修改个人信息---------------------------
router.get('/edit', (req, res) => {
    if (req.query.id) {
        const userData = User.findById(req.query.id),
            rowData = Row.find(),
            colData = Col.find(),
            allP = Promise.all([userData, rowData, colData])
        allP.then(([user, rowList, colList]) => {
            res.render('user/reg', {
                user,
                rowList,
                colList,
                isedit: true
            })
        })
    } else {
        res.send('路径错误')
    }
})
router.post('/edit/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.json({ status: 'y', msg: '修改成功' })
    }).catch(err => {
        res.send(err)
    })
})
module.exports = router;