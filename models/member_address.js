// address    省市区县
// address_detail   详情
// is_default   是否默认值
// m_id      关联的用户id
const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema,
    memberAddress = new Schema({
        address: {
            type: String,
            default: ''
        },
        address_detail: {
            type: String,
            default: ''
        },
        is_default: {
            type: Boolean,
            default: 1
        },
        m_id: {
            type: Schema.Types.ObjectId,
            ref: 'member'
        }
    }),
    MemberAddress = mongoose.model('member_address', memberAddress)
module.exports = MemberAddress