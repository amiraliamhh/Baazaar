const express = require('express');
const router = express.Router();

router.route('/login')
    .get((req, res, next) => {
        res.render('admin/login', {});
    })


module.exports = router;