(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["autograph"] = factory();
	else
		root["autograph"] = factory();
})(globalThis, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/autograph.js
const autograph = function ({canvasWidth = 300, canvasHeight = 150, imgType = 'image/png', textColor = 'black', saveCb}) {
  // ??????????????????
  const autographWrap = document.createElement('div')
  autographWrap.classList.add('autographWrap')
  autographWrap.style.cssText = `width: ${ canvasWidth }px`

  // ????????????
  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  canvas.classList.add('canvas')

  // ?????????????????????
  let content = canvas.getContext('2d')
  content.fillStyle = '#eee'
  content.fillRect(0, 0, canvas.width, canvas.height)

  drawGraph(canvas, content, textColor)

  let buttongrap = operateCanvas(canvas, content, imgType, saveCb)

  // ?????????????????????????????????
  autographWrap.appendChild(canvas)
  autographWrap.appendChild(buttongrap)

  return autographWrap
}

// ?????????????????????????????????
const drawGraph = function (canvas, content, textColor) {
  // ????????????????????????
  let cbMove;
  // ????????????????????????
  let cbDown = (event) => {
    let xStart = event.offsetX
    let yStart = event.offsetY

    let startDraw = (event) => {
      let xEnd = event.offsetX
      let yEnd = event.offsetY

      //????????????????????????
      isRemoveEvent(canvas, cbMove)

      // ??????
      strokeLine(content, xStart, yStart, xEnd, yEnd, textColor)
      xStart = xEnd
      yStart = yEnd
    }
    cbMove = startDraw
    canvas.addEventListener('mousemove', cbMove)
  }

  canvas.addEventListener('mousedown', cbDown)
}

// ????????????canvas???????????????????????????????????????
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

// ?????????????????????
const strokeLine = function (content, xStart, yStart, xEnd, yEnd, color) {
  content.beginPath()
  content.moveTo(xStart, yStart)
  content.lineTo(xEnd, yEnd)
  content.strokeStyle = color
  content.stroke()
  content.closePath()
}

// ???????????????????????????
const operateCanvas = function (canvas, content, imgType, saveCb) {

  const buttongroup = document.createElement('div')
  buttongroup.classList.add('buttongroup')

  // ????????????
  function clearButtonMeth() {
    content.clearRect(0, 0, canvas.width, canvas.height);
    content.fillStyle = '#eee'
    content.fillRect(0, 0, canvas.width, canvas.height)
  }
  let clearButton = bindingAttrAndMeth('????????????', clearButtonMeth)

  //  ????????????
  function preserveCanvasMeth() {
    let imgs = canvas.toDataURL(imgType)
    saveCb && saveCb(imgs)
    const link = document.createElement('a')
    link.href = imgs
    link.download = `autograph.${imgType ? imgType.split('/')[1] : 'png'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    clearButtonMeth()
  }
  let preserveCanvas = bindingAttrAndMeth('????????????', preserveCanvasMeth)

  buttongroup.appendChild(clearButton)
  buttongroup.appendChild(preserveCanvas)

  return buttongroup
}


// ????????????canvas?????????
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

/* harmony default export */ const src_autograph = (autograph);
;// CONCATENATED MODULE: ./src/index.js




// const ele = canvasAutograph({
//   canvasWidth:500,
//   canvasHeight:250 ,
//   imgType: 'image/jpeg',
//   textColor: 'red',
//   saveCb: (res) => {
//     console.log('resssss==', res)
//   }
// })
// document.body.appendChild(ele)

/* harmony default export */ const src = (src_autograph);
/******/ 	return __webpack_exports__;
/******/ })()
;
});