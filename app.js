const koa = require('koa');
const koa_static = require('koa-static');
const path = require('path')
const router = require('koa-router')();
const fs = require('fs');
 
const app = new koa();
 
app.use(koa_static('./dist'))
 
router.get('/geticonfont', function (ctx, next){
    let arr = fs.readdirSync('./svgs')
    let tmp = [];
    arr.forEach(item=>{
        tmp.push(item.split('.')[0])
    })
    ctx.body = {
        status: 200,
        data: tmp
    }
    next();
     
})
app.use(router.routes()).use(router.allowedMethods());
 
app.listen('8097', function (){
    console.log('listening 8097');
})