export class CreateStore {
  // rootReducer(state, action)
  constructor(rootReducer, initialState = {}) {
    this.state = rootReducer({...initialState}, {type: '__INIT__'})
    this.listeners = []
    this.rootReducer = rootReducer
  }

  subscribe(fn) {
    this.listeners.push(fn)
    return {
      unsubscribe() {
        this.listeners = this.listeners.filter( unsb => unsb !== fn)
      }
    }
  }

  distpath(action) {
    // Reducer - fn проверяет на совпадения action type, возвращает новый state.
    const state = this.rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(state))
  }

  getState() {}
}
