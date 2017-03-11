var express = require('express');
var router = express.Router();
var Word = require('../models/Word');

router.post('/getData', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    Word.findAll(function (err, message) {
        if(err){
            console.log(err);
        }else{
            var json = {results:message};
            res.jsonp(json);
        }
    });
});

router.get('/', (req, res, next)=>{
    let group = {
        key: {userId: true},
        cond: {},
        reduce: function(doc, out) {
            out.count++;
        },
        initial: {
            count: 0
        }
    };

    Word.collection.group(group.key, group.cond, group.initial, group.reduce, true, function(err, results) {
        if(err){
            res.render('error');
        }
        else{
            res.render('index',{data: results});
        }
    });


});

//测试例
// router.get('/save', function (req, res, next) {
//     new Word({
//         word: "409,492;409,492;409,492;419,490;446,488;485,489;521,490;544,492;557,493;562,495;564,499;561,513;548,533;521,561;489,590;456,619;429,642;408,659;399,667;395,671;396,673;417,674;451,670;487,663;511,658;522,657;526,657;524,662;512,677;486,701;460,724;443,740;433,751;428,757;430,759;457,761;501,757;544,749;577,743;602,742;619,743;627,746;631,749;626,763;608,786;572,817;532,850;476,887;424,920;366,952;319,977;286,996;258,1010;243,1016;233,1020;229,1022;227,1022;228,1023;238,1024;291,1017;348,1003;426,984;503,967;578,952;650,939;708,932;754,929;785,932;801,935;810,940;814,944;816,953;813,963;803,976;790,989;776,1002;761,1011;740,1020;719,1023;705,1018#494,316;494,316;494,316;494,316;493,330;494,350;497,382;499,414;501,451;501,481;500,518;499,557;500,599;502,646;504,701;505,755;507,810;507,860;508,904;509,935;510,962;510,981;508,998;506,1013;504,1028;502,1043;499,1057;497,1070;495,1082;494,1094;492,1106;489,1117;486,1128;483,1138;478,1149;474,1158;467,1168;459,1177;449,1185;439,1192;428,1200;415,1206;398,1211;384,1213;374,1213;365,1212;358,1210;354,1207;351,1203;351,1191;364,1158;385,1127;410,1098;447,1070;478,1056;503,1052;526,1056;547,1063;566,1074;582,1085;594,1097;604,1110;610,1125;611,1139;606,1154;599,1167;588,1182;574,1195;558,1209;544,1221;526,1233;506,1242;490,1249;472,1257;452,1262;434,1266;403,1275;374,1284;338,1296;304,1309",
//         wordIndex: -1,
//         str: "ᠬᠤᠯᠮᠠᠯᠵᠠ",
//         createAtDate: new Date(),
//         updateAtDate: new Date(),
//         ipAddress: "ipAddress",
//         phoneId: "phoneId"
//     }).save(function (err) {
//         if (err){
//             console.log(err);
//         }else{
//             res.jsonp({state:'success'});
//         }
//     });
// });

router.post('/save', function (req, res, next) {
    new Word({
        word: req.body.word,
        wordIndex: req.body.wordIndex,
        str: req.body.str,
        createAtDate: new Date(),
        updateAtDate: new Date(),
        ipAddress: req.body.ipAddress,
        phoneId: req.body.phoneId,
        userId: req.body.userId,
        paid: false
    }).save(function (err) {
        if (err){
            console.log(err);
            res.jsonp({state:0});
        }else{
            res.jsonp({state:1});
        }
    });
});

router.post('/getSizeNoPaid', (req, res, next)=>{
    Word.getNoPaidSizeByUsername(req.body.username,(err,data)=>{
        if (err){
            console.log(err);
            res.jsonp(0);
        }else{
            if(data==null){
                res.jsonp(0);
            }else{
                res.jsonp(data);
            }
        }
    })
});

router.post('/getSizePaid', (req, res, next)=>{
    Word.getPaidSizeByUsername(req.body.username,(err,data)=>{
        if (err){
            console.log(err);
            res.jsonp(0);
        }else{
            if(data==null){
                res.jsonp(0);
            }else{
                res.jsonp(data);
            }
        }
    })
});

router.get('/paidByUser',(req, res, next)=>{
    res.render('index');
});

router.post('/paidByUser',(req, res, next)=>{
    Word.update({userId:req.body.username},{$set: {paid: true}},{multi:true},(err)=>{
        if (err){
            console.log(err);
            res.jsonp('error');
        }else{
            res.jsonp('success');
        }
    });
});

module.exports = router;