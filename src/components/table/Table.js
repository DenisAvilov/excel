import {Component} from '../../core/Component';
import {TableSelected} from './Table.selector';
import {createTable} from './table.template';
import {resize, eventCell, matrixCell, matrixGroup} from './table.function';
import {tableResize} from './table.resize';
import {$} from './../../core/dom'
export class Table extends Component {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listener: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  static className = 'excel__table'

  toHTML() {
    return createTable(30)
  }

  prepare() {
    this.selected = new TableSelected()
  }

  init() {
    super.init()
    this.selected.select(this.$root.find('[data-rowAndCell="0:0"]'))
    this.$on('formula:input', (text) => this.selected.startGroup.$el.innerText = `${text}`)
    this.$on('formula:focus', () => this.selected.startGroup.$el.focus())
  }

  selectCell(cell) {
    this.selected.select(cell)
    this.$distpath('table:input', cell.textContent())
  }

  onMousedown(event) {
    const $target = $(event.target)
    if (resize(event)) {
      tableResize(this.$root, event)
    }
    if (eventCell(event)) {
      if (event.shiftKey) {
        event.preventDefault()
        this.selected.selectGroup(
            matrixGroup($target, this.selected.startGroup)
                .map( (el) => this.$root.find(`[data-rowAndCell="${el}"]`))
        )
      } else {
        const cell = this.$root.find(`[data-rowAndCell="${eventCell(event)}"]`)
        this.selectCell(cell)
      }
    }
  }

  onKeydown(event) {
    const $target = $(event.target)
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
    const maxrow = this.$root.childElementCount() - 2
    const maxcol = this.$root.find('.row-data').childElementCount() - 1
    const col = $target.idCell(true).col
    const row = $target.idCell(true).row
    if (keys.includes(event.key) && !event.shiftKey ) {
      event.preventDefault()
      this.selectCell(this.$root.find( matrixCell(event.key, col, row, maxcol, maxrow)))
    }
  }

  onInput(event) {
    this.$distpath('table:input', $(event.target).textContent())
  }
}


