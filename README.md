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
  const ele = autograph(width, height, textColor)
```

## params
```
1.width: 画布宽度
2.height: 画布高度（并非整个签名模块的高度）
3.textColor：签名的文字颜色
```