import {Component} from '../../core/Component';
import {$} from '../../core/dom';


export class Formula extends Component {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listener: ['keydown', 'input'],
      ...options
    } )
  }
  static className = 'excel__formula'
  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
      `
  }
  init() {
    super.init()
    const $formula = this.$root.find('#formula')
    this.$on('table:input',
        (text$target) => $formula.textContent(text$target))
    this.subscribe((fn) => console.log('this is Formula fn', fn))
  }
  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$distpath('formula:focus')
    }
  }
  onInput(event) {
    this.$distpath('formula:input', $(event.target).textContent())
    this.distpath({type: 'Formula'})
  }
}

