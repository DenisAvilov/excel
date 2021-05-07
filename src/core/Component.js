import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor($root, opstions = {}) {
    // передаем масив с событиями в DomListener
    super($root, opstions.listener)
    this.name = opstions.name || ''
    this.prepare()
  }
  toHTML() {
    return ''
  }
  prepare() {
    // console.log('Component Prepare')
  }
  init() {
    this.initDomListener()
  }
  destroy() {
    this.removeListener()
  }
}

