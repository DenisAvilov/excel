import {$} from '../../core/dom'

export class Exsel {
  constructor(selector, opstions) {
    this.$el = $(selector)
    this.components = opstions.components || []
    this.name = opstions.name || ''
  }
  goRen() {
    const $excel = $.create('div', 'excel')
    this.components = this.components.map( Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // DEBUG
      if (component.name) {
        window['c' + component.name] = component
      }
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
