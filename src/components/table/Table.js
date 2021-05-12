import {Component} from '../../core/Component';
import {TableSelected} from './Table.selector';
import {createTable} from './table.template';
import {resize, eventCell, matrixCell, matrixGroup} from './table.function';
import {tableResize} from './table.resize';
import {$} from './../../core/dom'
export class Table extends Component {
  constructor($root) {
    super($root, {
      name: 'Table',
      listener: ['mousedown', 'keydown']
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
        this.selected.select(this.$root.find(`[data-rowAndCell="${eventCell(event)}"]`))
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
      const newCell = this.$root.find( matrixCell(event.key, col, row, maxcol, maxrow))
      this.selected.select(newCell)
    }
  }
}


