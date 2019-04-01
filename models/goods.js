const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema
const goodsSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    store_count: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: ''
    },
    goods_type: {
        type: Schema.Types.ObjectId, //分类id
        ref: 'goods_type' //关联的模型
    }
});
// 单件商品
const Goods = mongoose.model('goods', goodsSchema)

module.exports = Goods;