import {$} from '../../core/dom'
import {Observer} from '../../core/Observer'
export class Exsel {
  constructor(selector, opstions) {
    this.$el = $(selector)
    this.components = opstions.components || []
    this.name = opstions.name || ''
    this.emiter = new Observer()
  }
  goRen() {
    const options = {
      emiter: this.emiter
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
    // после того как отрисовали HTML и заапендили Component
    this.components.forEach(component => component.init())
  }
}
// треюа срати своею сракою
