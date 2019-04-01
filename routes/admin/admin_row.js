const express = require('express'),
    router = express.Router(),
    Row = require('../../models/row')


//------------------------------------------- 行显示 ----------------------------------------------
router.get('/', (req, res) => {
    Row.find()
        .then(data => {
            res.render('admin/row/index', { list: data })
        })
})

// -------------------------------------------行新增---------------------------------------------------
router.get('/add', (req, res) => {
    res.render('admin/row/add')
})

router.post('/add', (req, res) => {
    var model = new Row(req.body)
    model.save().then(data => {
        // res.send('保存成功')
        res.redirect('/admin/rows'); //页面重定向
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})
module.exports = router