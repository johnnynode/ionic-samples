# ionic v1 tab app template demo

## Branches
- Current branch is **ionic-v1**, switch to [ionic-angular branch](https://github.com/johnnynode/ionic-samples/tree/ionic-angular)

## Clone
- $ `git clone -b ionic-v1 git@github.com:johnnynode/ionic-sample.git  --depth 1`

## Install
- $ `cd ionic-sample`
- $ `yarn install` or $ `npm i`
- $ `bower install --force` (manual operation not in scripts)

## Run
- $ `gulp server` 

## Build
- $ `gulp build`

## Build-server
- $ `gulp build-server`

## About samples
- src 目录是源码目录
- www 目录是构建后的输出目录
- 去除了通过 $ `ionic serve` 来启动的各种局限性

## Beware
- 不要直接打包, 一些数据是通过http的方式请求的，在手机上的请求，路径会出现问题，需要自己修改成自己的数据(比如通过service提供数据)再打包，demo 仅作为演示。[之后将会改进项目]
- pdf 如果pdf长时间打不开，请翻墙，pdf预览地址是：https://mozilla.github.io/pdf.js/web/viewer.html , 可修改成你们自己的pdf路径, 只提供演示
- 视频源地址是videogular官网上的一个视频demo地址：http://static.videogular.com/assets/videos/videogular.mp4
- 音频源使用网上链接易失效，存放于本地audio文件夹下：src/audio/music.mp3
- 关于跨域问题，详见 gulp-connect的 api, 在gulpfile中已写上了部分demo,根据自己的需求改写

## PdfLoading
- [pdf show demo](./mds/pdf.md)
- [Related Blog](http://blog.csdn.net/tyro_java/article/details/73058952) 

## AudioPlay
- [audio show demo](./mds/audio.md)
- [Related Blog](http://blog.csdn.net/tyro_java/article/details/73043991) 

## VideoPlay
- [video show demo](./mds/video.md)
- [Related Blog](http://blog.csdn.net/tyro_java/article/details/73040008) 

## CategoryScrolling
- [category letters show demo](./mds/cate.md)
- [Related Blog](http://blog.csdn.net/tyro_java/article/details/77622455) 

## CarouselScaleBanners
- [carousel scale banners show demo](./mds/scaleBanners.md)
- [Related Blog](http://blog.csdn.net/tyro_java/article/details/77937586)

## Splash
- https://github.com/johnnynode/ionic-splash-demo

## License
MIT