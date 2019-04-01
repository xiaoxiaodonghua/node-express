const express = require('express'),
    router = express.Router()
router.get('/', (req, res) => {
    res.render('mobile/me', {
        navIndex: 3
    })
})

module.exports = router