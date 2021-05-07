import {$} from './core/dom';
import './scss/style.scss'
const {Exsel} = require('./components/excel/Excel');
const {Formula} = require('./components/formula/Formula');
const {Header} = require('./components/header/Header');
const {Toolbar} = require('./components/toolbar/Toolbar');
const {Table} = require('./components/table/Table');
const excel = new Exsel('#app', {
  components: [Header, Toolbar, Formula, Table]
})
excel.render()
window.excel = excel
window.$ = $
