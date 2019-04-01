//username 用户名
// email 邮箱
//  mobile  手机号
// 	name  名字
// 	 nick_name昵称  
// 	 user_pwd 密码
// 	 is_encyption 是否加密（默认加密）
// 	 img  头像
// 用户默认可以使用用户名、邮箱和手机号登录
// 所以三者不能重复
const db = require('../db'),
    mongoose = db.mongoose,
    Schema = db.Schema,
    member = new Schema({
        user_name: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        mobile: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        nick_name: {
            type: String,
            default: ''
        },
        user_pwd: {
            type: String,
            default: ''
        },
        img: {
            type: String,
            default: ''
        },
        is_encyption: {
            type: Boolean,
            default: 1
        }
    })

member.statics.validateUserName = function(model, cb) {
    this.count({ $or: [{ user_name: model.user_name }, { email: model.email }, { mobile: model.mobile }] })
        .then(c => {
            if (c > 0) {
                cb(false)
            } else {
                cb(true)
            }
        })
}

const Member = mongoose.model('member', member)
module.exports = Member