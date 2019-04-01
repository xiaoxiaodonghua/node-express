const express = require('express'),
    router = express.Router(),
    MemberAddress = require('../../models/member_address')



//----------------------- 用户地址显示--------------
router.get('/index/:id', (req, res) => {
    const queryData = MemberAddress.find({ m_id: req.params.id }).sort({ _id: -1 })
    queryData.then(data => {
        console.log(data)
        res.render('admin/member_address/index', {
            list: data,
            m_id: req.params.id
        })
    })
})

// ----------用户地址新增--------------
router.get('/add/:m_id', (req, res) => {
    const model = new MemberAddress();
    let p = '',
        c = '',
        a = ''
    res.render('admin/member_address/add', {
        model,
        isedit: false,
        p,
        c,
        a
    })
})

router.post('/add/:m_id', (req, res) => {
    const model = new MemberAddress({
        m_id: req.params.m_id,
        address: req.body.province + '-' + req.body.city + '-' + req.body.area,
        address_detail: req.body.address_detail,
        is_default: req.body.is_default
    })
    model.save()
        .then(data => {
            console.log(data)
            res.redirect('/admin/members_address/index/' + req.params.m_id)
        })
        .catch(err => {
            res.send(err)
        })
})

// ----------------------用户地址修改---------------
router.get('/edit', (req, res) => {
    const queryData = MemberAddress.findById(req.query.id)
    queryData.then(model => {
        console.log(model)
        let p = '',
            c = '',
            a = '';
        try {
            p = model.address.split('-')[0]
            c = model.address.split('-')[0]
            a = model.address.split('-')[0]
        } catch (err) {}
        res.render('admin/member_address/add', {
            model,
            isedit: true,
            p,
            c,
            a
        })
    }).catch(err => {
        res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
    const reqData = {
        address: req.body.province + '-' + req.body.city + '-' + req.body.area,
        address_detail: req.body.address_detail,
        is_default: req.body.is_default
    }
    MemberAddress.findByIdAndUpdate(req.params.id, reqData)
        .then(data => {
            res.redirect('/admin/members_address/index/' + data.m_id)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/remove', (req, res) => {
    if (req.body.id) {
        MemberAddress.findByIdAndRemove(req.body.id)
            .then(data => {
                res.redirect('/admin/members_address/index/' + data.m_id)
            })
    } else {
        res.send('请选择要删除的id');
    }
})
module.exports = router