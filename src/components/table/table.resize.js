import {$} from './../../core/dom'
import {resize} from './table.function'
export const tableResize = ($root, event) => {
  let size
  const $target = $(event.target)
  const parant = $target.closest('[data-type="resize"]')
  const coordinatesEL = parant.getClientRect()
  const type = resize(event)
  const typeActive = type === 'col'? 'bottom': 'right'
  $target.css({[typeActive]: '-3000px'})
  document.onmousemove = ( eventMove => {
    if (type === 'col') {
      const delta = coordinatesEL.right - eventMove.pageX
      size = coordinatesEL.width - delta
         size <= 40 ? size = 40 : size
         $target.css({'right': delta + 'px'})
    } else {
      const delta = coordinatesEL.bottom - eventMove.clientY
      size = coordinatesEL.height - delta
         size <= 24 ? size = 24 : size
         $target.css({'bottom': delta + 'px'})
    }
  })
  document.onmouseup = () => {
    document.onmousemove = null
    if (type === 'col') {
      $root.findAll(`[data-count="${parant.data.count}"]`)
          .forEach(element => {
            element.style.width = size + 'px'
          });
      $target.css({'right': '0', 'bottom': '0'})
    } else {
      document.onmousemove = null
      parant.css({'height': size + 'px'})
      $target.css({'right': '0', 'bottom': '0'})
    }
  }
}
