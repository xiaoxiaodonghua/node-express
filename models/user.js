// 用户信息
const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema,

    userSchema = new Schema({
        name: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: '男'
        },
        row_id: {
            type: Schema.Types.ObjectId,
            ref: 'row'
        },
        col_id: {
            type: Schema.Types.ObjectId,
            ref: 'col'
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
const User = mongoose.model('user', userSchema)
module.exports = User