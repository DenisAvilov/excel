import {Component} from '../../core/Component';


export class Formula extends Component {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      // определяем слушателя
      listener: ['keydown'],
      ...options
    } )
  }
  static className = 'excel__formula'
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
      `
  }
  init() {
    super.init()
    this.emiter.subscribe('table:forumlaContant',
        (text$target) => this.$root.find('.input').textContent(text$target))
  }
  onKeydown(event) {
    const text = event.target.textContent.trim()
    this.emiter.distpath('formula:selection', text)
    if (event.key === 'Enter') {
      event.preventDefault()
      this.emiter.distpath('formula:focus')
    }
  }
}
// #id.addEventListener('input', ()=>{})
