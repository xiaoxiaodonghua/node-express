// 用户信息
const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema,

    adminUserSchema = new Schema({
        user_name: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        mobile: {
            type: String,
            default: ''
        },
        qq: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        user_pwd: {
            type: String,
            default: ''
        },
        is_encryption: {
            type: Boolean,
            default: '1'
        }
    });
adminUserSchema.statics.validateUserName = function(model, cb) {
    this.count({ $or: [{ user_name: model.user_name }, { email: model.email }] })
        .then(c => {
            if (c > 0) {
                cb(false)
            } else {
                cb(true)
            }
        })
}
const AdminUser = mongoose.model('admin_user', adminUserSchema)
module.exports = AdminUser