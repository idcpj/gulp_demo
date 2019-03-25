## 安装 
```
npm install --global gulp-cli

npm install --save-dev gulp

git clone http://github.com/idcpj/gulp_demo

npm install 


```

## 使用的插件
`gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev`

### 测试
style 测试 - 编译sass、自动添加css前缀和压缩

`gulp styles`

js测试 - js代码校验、合并和压缩

`gulp scripts`

image  测试 - 压缩图片


`gulp images`

清理 dis 文件

`gulp clean`

测试 同时生成 css,js,html

`gulp`

监听文件且自动刷新页面


`gulp watch`

## 进阶
### 使用 bower 管理包
> [bower 教程](https://www.kancloud.cn/idcpj/python/993424)


```
sudo npm install bower --global
bower init
```

创建 `.bowerrc` 文件


设置文件下载路径
```
{ "directory" : "dist/vendor/" }
```
安装模块
`bower install -S juqery`
安装项目模块
`bower install `