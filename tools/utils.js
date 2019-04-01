const crypto = require('crypto')
var utils = {}

function md5(str) {
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest('hex').toString()
}
// getPages()用于生成当前显示的页码范围----------------------------
function getPages(page, pageCount) {
    var pages = [page]

    var left = page - 1
    var right = page + 1

    while (pages.length < 5 && (left >= 1 || right <= pageCount)) {
        if (left > 0) pages.unshift(left--)
        if (right <= pageCount) pages.push(right++)
    }
    // console.log(pages)
    return pages
}
module.exports = { md5, getPages };