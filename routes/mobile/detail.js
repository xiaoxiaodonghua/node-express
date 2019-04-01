const express = require('express'),
    router = express.Router(),
    Goods = require('../../models/goods')
router.get('/:id', (req, res) => {
    Goods.findById(req.params.id).then(data => {
        console.log(data)
        res.render('mobile/detail', {
            data,
            navIndex: 1
        })
    })
})

module.exports = router