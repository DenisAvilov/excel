import {Component} from '../../core/Component';
import {TableSelected} from './Table.selector';
import {createTable} from './table.template';
import {resize} from './table.function';
import {tableResize} from './table.resize';
export class Table extends Component {
  constructor($root) {
    super($root, {
      name: 'Table',
      listener: ['mousedown']
    })
  }
  static className = 'excel__table'

  toHTML() {
    return createTable(25)
  }

  prepare() {
    this.selected = new TableSelected()
  }

  init() {
    super.init()
    this.selected.select(this.$root.find('[data-rowAndCell="0:0"]'))
  }
  onMousedown(event) {
    if (resize(event)) {
      tableResize(this.$root, event)
    }
    if (event.target.dataset) {
      const $cell = event.target.dataset.rowandcell
      this.selected.select(this.$root.find(`[data-rowAndCell="${$cell}"]`))
    }
  }
}

