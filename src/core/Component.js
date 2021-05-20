import {DomListener} from './DomListener';

export class Component extends DomListener {
  constructor($root, opstions = {}) {
    // передаем масив с событиями в DomListener
    super($root, opstions.listener)
    this.name = opstions.name || ''
    this.emiter = opstions.emiter
    this.unsubscribers = []
    this.prepare()
    this.store = opstions.store
    this.unsubscribs = []
  }

  // Возвращяем шаблон, отрисовка компоненты
  toHTML() {
    return ''
  }

  // Сообoаяем о новом событии, создаем событие.
  // Уведомляем слушателей про событие event.
  // Pattern Fasad
  $distpath(event, ...args) {
    this.emiter.fire(event, ...args)
  }

  // Подписываемся на изменения события event
  // Pattern Fasad
  $on(event, fn) {
    // this.emiter.subscribe(event, fn)
    const unsb = this.emiter.subscribe(event, fn)
    this.unsubscribers.push(unsb)
  }
  // передаем action type -> Reducer для получения Store
  distpath(action) {
    this.store.distpath(action)
  }
  // передаем функцию в масив слушателей
  subscribe(fn) {
    const unsb = this.store.subscribe(fn)
    this.unsubscribs.push(unsb)
  }

  // Подготовка компонета до init
  prepare() {
    // console.log('Component Prepare - подготовить')
  }

  // инициализация приложения
  // Добавляем слушателей
  init() {
    this.initDomListener()
  }

  // Удаляем компонент
  // Удаление слушателей
  destroy() {
    this.removeListener()
    this.unsubscribers.forEach(fn => fn())
    this.unsubscribs.forEach(fn => fn())
  }
}

