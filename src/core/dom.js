class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  appendDom(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  textContent(text) {
    if (typeof text === 'string') {
      return this.$el.innerHTML = text
    }
    return this.$el.innerText
  }
  on(eventTarget, callBack) {
    // console.log(eventTarget)
    return this.$el.addEventListener(eventTarget, callBack)
  }
  off(eventTarget, callBack) {
    return this.$el.removeEventListener(eventTarget, callBack)
  }
  closest(el) {
    return $(this.$el.closest(el))
  }
  get data() {
    return this.$el.dataset
  }
  idCell(cell) {
    if (cell) {
      const id = this.idCell().split(':')
      return {
        row: +id[0],
        col: +id[1]
      }
    }
    return this.$el.dataset.rowandcell
  }
  focus() {
    this.$el.focus()
    return this
  }
  css(styles) {
    Object.keys(styles)
        .forEach(e => this.$el.style[e] = styles[e])
  }
  classAdd(el) {
    return this.$el.classList.add(el)
  }
  classDel(el) {
    return this.$el.classList.remove(el)
  }
  getClientRect() {
    return this.$el.getBoundingClientRect()
  }
  find(el) {
    return $(this.$el.querySelector(el))
  }
  childElementCount() {
    return this.$el.childElementCount
  }
  findAll(el) {
    return this.$el.querySelectorAll(el)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (el, className = '') => {
  const $node = document.createElement(el)
  if (className) {
    $node.classList.add(className)
  }
  return $($node)
}


