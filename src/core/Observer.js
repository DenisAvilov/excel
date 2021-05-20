export class Observer {
  constructor() {
    this.listeners = {}
    this.unsubscribe = {}
  }
  // distpath, emit, fire, trigger (event: string)
  // ('table:select', {})
  fire(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(el => {
      el(...args)
    })
    return true
  }
  // on, listen
  // formula.subscribe( 'table:select', ()=>{})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter( listeners => listeners !== fn)
    }
  }
}
