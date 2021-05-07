import {Component} from '../../core/Component';

export class Formula extends Component {
  constructor($root) {
    super($root, {
      name: 'Formula',
      // определяем слушателя
      listener: ['input', 'click']
    } )
  }
  static className = 'excel__formula'
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
      `
  }
  onInput(event) {
    // console.log(this.$root, ' root event')
    // console.log('Formula: onInput', event.target.textContent.trim())
  }
  onClick() {
    // console.log(' click')
  }
}
// #id.addEventListener('input', ()=>{})
