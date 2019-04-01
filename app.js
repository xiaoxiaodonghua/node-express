var express = require('express'); //引入express框架
var path = require('path'); //引入path模块（路径解析）
var favicon = require('serve-favicon') //引入favicon模块
var logger = require('morgan'); //引入morgan模块(终端日志)
var cookieParser = require('cookie-parser'); //cookie格式化
var bodyParser = require('body-parser'); //form表单数据格式化

//路由模块
var index = require('./routes/index');
var users = require('./routes/users');

// 引入 AdminUser模型  utils加密模块
const AdminUser = require('./models/admin_user'),
    utils = require('./tools/utils')

var app = express();

// view engine setup 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
global.baseDir = __dirname; // 设置存储全局目录路径
// 使用插件模块
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //使用终端日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 使用自定义路由模块
app.use('/', index);
app.use('/users', users);
app.use('/common', require('./routes/common'));


//---------------创建最高管理员----------
AdminUser.count().then(data => {
    if (data > 0) {
        console.log('存在最高管理员')
    } else {
        console.log('不存在最高管理员')
        new AdminUser({ user_name: 'admin', email: 'liuxiaodong@qq.com', user_pwd: 'admin', name: '刘晓冬', mobile: '13151646615', qq: '1657294185', is_encryption: false }).save()

    }
})

// ------------------------必须写在访问权限之前---------------------
// 管理后台登录页面
app.get('/admin/login', (req, res) => {
    res.render('admin/login')
})

//后台登录
app.post('/admin/login_sub', (req, res) => {
    AdminUser.findOne({ $or: [{ user_name: req.body.uName }, { email: req.body.uName }] }).then(u => {
        if (u) {
            var strPwd = req.body.uPwd
            if (u.is_encryption) {
                strPwd = utils.md5(strPwd)
            }
            if (strPwd == u.user_pwd) {
                res.cookie('admin_user', u.id, { path: '/' });
                res.cookie('adminUser', u.user_name, { path: '/' });
                res.json({ status: 'y', msg: '登录成功' })
            } else {
                res.json({ status: 'n', msg: '密码错误,请重新输入' })
            }
        } else {
            res.json({ status: 'n', msg: '用户信息错误' })
        }
    })
})

// ----------------------------设置管理后台的访问权限--------------------
// app.all 表示所有的请求(post,get)
app.all('/admin/*', (req, res, next) => {
    if (req.cookies.admin_user) { //如果已经登录
        next()
    } else { //没有登录进入登录页面
        res.redirect('/admin/login')
    }
})

// ----------------------------------------------------------------

app.use('/admin', require('./routes/admin/main'))
app.use('/admin/rows', require('./routes/admin/admin_row'))
app.use('/admin/cols', require('./routes/admin/admin_col'))
app.use('/admin/goods_type', require('./routes/admin/admin_good_type'))
app.use('/admin/goods', require('./routes/admin/admin_good'))
app.use('/admin/users', require('./routes/admin/admin_user'))
app.use('/admin/members', require('./routes/admin/member'))
app.use('/admin/members_address', require('./routes/admin/member_address'))
app.use('/api/v1/validate', require('./routes/api/v1/validate'))
app.use('/api/v1/goods', require('./routes/api/v1/goods'))
app.use('/mobile', require('./routes/mobile'))
app.use('/mobile/detail', require('./routes/mobile/detail'))
app.use('/mobile/me', require('./routes/mobile/me'))
app.use('/mobile/me/register', require('./routes/mobile/me/register'))
app.use('/mobile/me/signin', require('./routes/mobile/me/signin'))
    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;