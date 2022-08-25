# canvas-autograph
## describe
```
  该插件可以，实现在线签名功能
  可以通过配置相关参数，配置画布的大小，文字颜色等功能
```

## use
```
1.安装
  npm i autograph-canvas

2.导入
  const autograph = require('autograph-canvas')  
  或者
  import autograph from 'autograph-canvas'

3.导入样式
  import('autograph-canvas/dist.index.css')

4.调用
  const ele = autograph(params)
```

## params
```
autograph接收一个对象，对象中可以设置如下参数
  1.canvasWidth: 画布宽度
  2.canvasHeight: 画布高度（并非整个签名模块的高度）
  3.imgType: 保存的图片类型（1.image/jpeg 2.image/png）,如果不传默认为image/png
  4.textColor: 签名的文字颜色
  5.isDownload： 点击保存签名，是否下载图片， 默认false （true：下载）
  6.isClearCanvas: 点击保存签名，是否清除画布， 默认false（true：清除）
  7.saveCb: 点击保存按钮时候的回调函数
```

## example
```
import canvasAutograph from 'autograph-canvas'

import 'autograph-canvas/dist/index.css'

const ele = canvasAutograph({
  canvasWidth:500,
  canvasHeight:250 ,
  textColor: 'red',
  imgType: 'image/jpeg',
  isDownload: false,
  isClearCanvas：false，
  saveCb: (res) => {
    console.log('图片的url', res)
  }
})
document.body.appendChild(ele)

```
## question
```
1.默认情况下，点击保存签名，除了返回图片url，还会下载图片，未做控制，待优化   -- solved
2.保存图片之后，默认清除画布，未做控制，待优化   --solved
3.不兼容H5
```