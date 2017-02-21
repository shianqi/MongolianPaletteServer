let express = require('express');
let router = express.Router();

let User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res) {
    User.findByUsername(req.body.username,function (err,date) {
        if(err){
            res.jsonp({state:0,message:'未知错误'});
        }else{
            if(date==null){
                res.jsonp({state:0,message:'用户名或密码错误'});
            }else if(req.body.username==date.username&&req.body.password==date.password){
                res.jsonp({state:1,message:'登陆成功'});
            }else{
                res.jsonp({state:0,message:'用户名或密码错误'});
            }
        }
    });
});

router.post('/register', (req, res)=>{
    User.findByUsername(req.body.username,function (err,date) {
        if(err){
            res.jsonp({state:0,message:'未知错误'});
        }else{
            if(date==null){
                let newUser = new User({
                    username : req.body.username,
                    password : req.body.password
                });

                newUser.save((err)=>{
                    if(err){
                        res.jsonp({state:0,message:'用户保存失败'});
                    }else{
                        res.jsonp({state:1,message:'注册成功'});
                    }
                });
            }else{
                res.jsonp({state:0,message:'已存在该用户'});
            }
        }
    });
});

module.exports = router;
