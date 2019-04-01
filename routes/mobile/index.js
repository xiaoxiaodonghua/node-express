const express = require('express'),
    router = express.Router(),
    GoodsType = require('../../models/goods_type'),
    Goods = require('../../models/goods'),
    untils = require('../../tools/utils')

router.get('/', (req, res) => {
    const queryGT = GoodsType.find(),
        pAll = Promise.all([queryGT])
    pAll.then(([queryData]) => {
        res.render('mobile/index', {
            queryData,
            navIndex: 0
        })
    })

})
router.get('/goods', (req, res) => {
    const queryG = Goods.find().sort({ _id: -1 }).limit(2),
        pAll = Promise.all([queryG])
    pAll.then(([goodsData]) => {
        res.render('mobile/goods', {
            goodsData,
            navIndex: 1
        })
    })
})
module.exports = router