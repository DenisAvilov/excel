import {capitalize} from './until'
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!')
    } else {
      // корневой элемент на него добовляем событие
      this.$root = $root
    }
    this.listeners = listeners
  }
  initDomListener() {
    this.listeners.forEach( listener => {
      const method = eventClick(listener)
      const name = this.name || ''
      // 03_8
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${name} Component`)
      }// bind creat new Function, this function dont remove in method off 03_10
      // wu must переапределить bind from our Context-This
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    } )
  }
  // стрелочная функция не создает своего собственного контекста
  removeListener() {
    this.listeners.forEach( listener => {
      const method = eventClick(listener)
      this.$root.off(listener, this[method])
    } )
  }
}

function eventClick(el) {
  return 'on' + capitalize(el)
}
