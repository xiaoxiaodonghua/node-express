const express = require('express'),
    router = express.Router(),
    GoodsType = require('../../models/goods_type'),
    Goods = require('../../models/goods'),
    utils = require('../../tools/utils')


// 商品信息显示--------分页
router.get('/', (req, res) => {
    let page = 1; // 当前页码
    if (req.query.page) {
        page = Number(req.query.page);
    }
    // 如果page是数字， page || 1 运算结果是page
    // 如果page是undefined，page || 1 运算结果是1

    // 分页基数为5：即每次显示5个
    var pageSize = 5

    Goods.find().count((err, total) => {
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
            Goods.find().populate('goods_type') // 数据查找
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .select()
                .exec((err, data) => {
                    if (err) {

                    } else {
                        // 把查询到的数据返回给客户端

                        res.render('admin/good/index', {
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

// -------------------商品信息新增-----------------
router.get('/add', (req, res) => {
    if (!req.query.id) {
        let model = new Goods(),
            isedit = false
        GoodsType.find().then(goodsTypeList => {
            res.render('admin/good/add', {
                goodsTypeList,
                model,
                isedit
            })
        })
    }
})

router.post('/add', (req, res) => {
    const model = new Goods(req.body)
    model.save().then(data => {
        res.redirect('/admin/goods')
    }).catch(err => {
        res.send(err)
    })
})

//--------------------------商品删除-------------------------------
router.post('/remove', (req, res) => {
    Goods.findByIdAndRemove(req.body.id).then(data => {
        res.redirect('/admin/goods')
    })
})

// -----------------------------商品修改
router.get('/edit', (req, res) => {
    if (req.query.id) {
        Goods.findById(req.query.id).then(model => {
            GoodsType.find().then(goodsTypeList => {
                res.render('admin/good/add', {
                    goodsTypeList,
                    model,
                    isedit: true
                })
            })
        })
    }
})
router.post('/edit/:id', (req, res) => {
    Goods.findByIdAndUpdate(req.params.id, req.body).then(data => {
        res.redirect('/admin/goods')
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router