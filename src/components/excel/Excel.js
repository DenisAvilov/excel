import {$} from '../../core/dom'
import {Observer} from '../../core/Observer'
export class Exsel {
  constructor(selector, opstions) {
    this.$el = $(selector)
    this.components = opstions.components || []
    this.name = opstions.name || ''
    this.emiter = new Observer()
    this.store = opstions.store
  }
  goRen() {
    const options = {
      emiter: this.emiter,
      store: this.store
    }
    const $excel = $.create('div', 'excel')
    this.components = this.components.map( Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, options)
      $el.html(component.toHTML())
      $excel.appendDom($el)
      return component
    });
    return $excel
  }
  render() {
    this.$el.appendDom(this.goRen())
    this.components.forEach(component => component.init())
  }
  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
// треба срати своею сракою
