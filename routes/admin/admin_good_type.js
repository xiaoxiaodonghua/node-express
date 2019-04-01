const express = require('express'),
    router = express.Router(),
    GoodsType = require('../../models/goods_type'),
    moment = require('moment')


// 商品类别显示
router.get('/', (req, res) => {
    GoodsType.find()
        .then(data => {
            res.render('admin/good_type/index', {
                list: data,
                moment
            })
        })
})

// -------------------商品分类新增-----------------
router.get('/add', (req, res) => {
    res.render('admin/good_type/add')
})

router.post('/add', (req, res) => {
    const model = new GoodsType(req.body)
    model.save().then(data => {
        res.redirect('/admin/goods_type')
    }).catch(err => {
        res.send(err)
    })
})
module.exports = router