<h2>MongolianPaletteServer</h2>
蒙古文手写路径搜集服务器。

<h3>所用技术</h3>
[`node.js`](https://nodejs.org/en/) [`mongodb`](https://www.mongodb.com/)

<h3>环境需求</h3>
需要安装 `node.js` 和 `mongodb`

运行方法，先启动mongodb的服务
```
mongod --dbpath D:\mongodb --logpath D:\mongodb\log.log --install
```
然后启动mongodb服务

之后到 nodejs 项目文件下运行：
```
npm run start
```
详情请查看`express`