// 列信息
const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema,

    colSchema = new Schema({
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        create_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    });
const Col = mongoose.model('col', colSchema)
module.exports = Col