const express = require('express');
const router = express.Router();

// 处理文件上传
const formidable = require('formidable');

router.post('/kindeditor/uploadImg', (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = global.baseDir + '/public/uploads'; // 图片保存的路径
    form.keepExtensions = true; // 保存文件后缀
    // 格式化request请求数据
    form.parse(req, function(err, fields, files) {
        if (err) {
            throw err;
        }
        const image = files.imgFile; // 获取图片信息
        // 获取图片的保存路径web地址
        var filePath = image.path.replace(/\\/g, '/'); // 路径正则替换
        var reGB = global.baseDir.replace(/\\/g, '/'); // 路径正则替换
        const fileUrl = filePath.replace(reGB + '/public', '');
        // console.log(fileUrl);
        res.json({
            error: 0,
            url: fileUrl
        })
    });
})

module.exports = router;