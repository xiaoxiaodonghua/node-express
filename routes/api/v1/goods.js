const express = require('express'),
    router = express.Router(),
    Goods = require('../../../models/goods'),
    utils = require('../../../tools/utils')



router.get('/', (req, res) => {
    let page = 1; // 当前页码
    if (req.query.page) {
        page = req.query.page
    }
    var pageSize = 2
    Goods.find().count((err, total) => {
        if (err) {} else {
            var pageCount = Math.ceil(total / pageSize)
            Goods.find().sort({ _id: -1 }) // 数据查找
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .select()
                .exec((err, data) => {
                    if (err) {

                    } else {
                        // 把查询到的数据返回给客户端
                        res.json({
                            ststus: 'y',
                            data: {
                                list: data,
                                pageCount,
                                page: page,
                            }
                        })
                    }
                })
        }
    })
})
module.exports = router