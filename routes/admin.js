/**
 * Created by killer on 2017/3/5.
 */
let express = require('express');
let router = express.Router();

let Admin = require('../models/Admin');

let isLogined = function(user){
    return (typeof user != "undefined");
};

let install = function(){
    Admin.find((err, data)=>{
        if(err) console.log(err);
        else{
            if(!data){
                new Admin({
                    username: 'killer',
                    password: '121021',
                }).save();
            }
        }
    });
};

router.get('/', (req, res, next)=>{
    res.render('index');
});

router.post('/login', (req, res, next)=>{
    let username = req.body.username;
    let password = req.body.password;
    Admin.find({username: username, password: password}, (err, data)=>{
        if(err) console.log(err);
        else{
            if(data!=null&& data.username === username && data.password === password){
                res.redirect('/');
            }else{
                req.session.user = data;
                res.render('login',{message: 'Wrong Username or Password !'});
            }
        }
    });
});

router.get('/logout', (req, res, next)=>{

});