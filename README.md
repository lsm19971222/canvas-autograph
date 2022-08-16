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
  5.saveCb: 点击保存按钮时候的回调函数
```

## 案例
```
import canvasAutograph from './autograph.js'

import './index.less'

const ele = canvasAutograph({
  canvasWidth:500,
  canvasHeight:250 ,
  textColor: 'red',
  imgType: 'image/jpeg'
  saveCb: (res) => {
    console.log('图片的url', res)
  }
})
document.body.appendChild(ele)

```