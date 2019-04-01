const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema,
    goodTypeSchema = new Schema({
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    })

// 商品分类模型
const GoodsType = mongoose.model('goods_type', goodTypeSchema)
module.exports = GoodsType;