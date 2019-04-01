// console.log('我是db文件')
// mongoose是一个node.js链接mongodbde orm
// orm对象模型关系映射，把一个对象映射到数据库中表（集合）之上
// 在mongoose中会自动在数据库中生成对象的复数形式作为对象的存储表（集合）
const mongoose = require('mongoose')
mongoose.Promise = global.Promise; //使用node.js内置的Promise
const Schema = mongoose.Schema; //Schema模型架构
mongoose.connect('mongodb://localhost/super_shop', {
    useMongoClient: true,
}, err => {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
    }
})

module.exports = {
    mongoose: mongoose,
    Schema: Schema
}