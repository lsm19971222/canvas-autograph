const autograph = function ({
  canvasWidth = 400,
  canvasHeight = 200,
  imgType = 'image/png',
  textColor = 'black',
  isDownload = false,
  isClearCanvas = false,
  saveCb} = {}) {
  // 创建导出容器
  const autographWrap = document.createElement('div')
  autographWrap.classList.add('autographWrap')
  autographWrap.style.cssText = `width: ${ canvasWidth }px`

  // 创建画布
  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  canvas.classList.add('canvas')

  // 生成画布上下文
  let content = canvas.getContext('2d')
  content.fillStyle = '#eee'
  content.fillRect(0, 0, canvas.width, canvas.height)

  drawGraph(canvas, content, textColor)

  let buttongrap = operateCanvas(canvas, content, imgType, isDownload, isClearCanvas, saveCb)

  // 添加画布和操作画布按钮
  autographWrap.appendChild(canvas)
  autographWrap.appendChild(buttongrap)

  return autographWrap
}

// 监听鼠标事件，实现签名
const drawGraph = function (canvas, content, textColor) {
  // 鼠标移动事件回调
  let cbMove;
  // 鼠标按下事件回调
  let cbDown = (event) => {
    let xStart = event.offsetX
    let yStart = event.offsetY

    let startDraw = (event) => {
      let xEnd = event.offsetX
      let yEnd = event.offsetY

      //移除鼠标移动事件
      isRemoveEvent(canvas, cbMove)

      // 绘图
      strokeLine(content, xStart, yStart, xEnd, yEnd, textColor)
      xStart = xEnd
      yStart = yEnd
    }
    cbMove = startDraw
    canvas.addEventListener('mousemove', cbMove)
  }

  canvas.addEventListener('mousedown', cbDown)
}

// 鼠标移出canvas的那一刻，移除鼠标移动事件
function isRemoveEvent(canvas, cbMove) {
  const winMouseEvent = function(event) {
    if (
      event.x < canvas.offsetLeft
      || event.x > canvas.offsetLeft + canvas.width
      || event.y < canvas.offsetTop
      || event.y > canvas.offsetTop + canvas.height
    ) {
      canvas.removeEventListener('mousemove', cbMove)
      window.removeEventListener('mousemove', winMouseEvent)
    }
  }
  window.addEventListener('mousemove', winMouseEvent)
  canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', cbMove)
    window.removeEventListener('mousemove', winMouseEvent)
  })
}

// 定义画线的方法
const strokeLine = function (content, xStart, yStart, xEnd, yEnd, color) {
  content.beginPath()
  content.moveTo(xStart, yStart)
  content.lineTo(xEnd, yEnd)
  content.strokeStyle = color
  content.stroke()
  content.closePath()
}

// 对画布进行相关操作
const operateCanvas = function (canvas, content, imgType, isDownload, isClearCanvas, saveCb) {

  const buttongroup = document.createElement('div')
  buttongroup.classList.add('buttongroup')

  // 清除画布
  function clearButtonMeth() {
    content.clearRect(0, 0, canvas.width, canvas.height);
    content.fillStyle = '#eee'
    content.fillRect(0, 0, canvas.width, canvas.height)
  }
  let clearButton = bindingAttrAndMeth('清除签名', clearButtonMeth)

  //  保存画布
  function preserveCanvasMeth() {
    let imgs = canvas.toDataURL(imgType)
    saveCb && saveCb(imgs)
    if (!isDownload) return;
    const link = document.createElement('a')
    link.href = imgs
    link.download = `autograph.${imgType ? imgType.split('/')[1] : 'png'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    isClearCanvas && clearButtonMeth()
  }
  let preserveCanvas = bindingAttrAndMeth('保存签名', preserveCanvasMeth)

  buttongroup.appendChild(clearButton)
  buttongroup.appendChild(preserveCanvas)

  return buttongroup
}


// 生成操作canvas的按钮
const bindingAttrAndMeth = function (innerText = '', callback) {
  const button = document.createElement('span')
  button.innerText = innerText
  button.classList.add('buttons')
  button.addEventListener('click', () => {
    button.style.cssText = 'background-color: #ccc;'
    setTimeout(() => {
      button.style.cssText = 'background-color: #ddd;'
    }, 100);
    callback && callback()
  })

  return button
}

export default autograph