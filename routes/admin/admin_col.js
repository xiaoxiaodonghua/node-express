const express = require('express'),
    router = express.Router(),
    Col = require('../../models/col')


// -------------------------------------列数据显示-------------------------------------------
router.get('/', (req, res) => {
    Col.find()
        .then(data => {
            res.render('admin/col/index', { list: data })
        })
})

// -------------------------------------列数据新增------------------------------------------
router.get('/add', (req, res) => {
    res.render('admin/col/add')
})

router.post('/add', (req, res) => {
    var model = new Col(req.body)
    model.save().then(data => {
        console.log(data)
            // res.send('保存成功')
        res.redirect('/admin/cols')
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})
module.exports = router