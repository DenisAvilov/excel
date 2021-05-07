
const leters = {
  A: 65,
  Z: 90,
  a: 101,
  z: 130
}
const capitalaze = (index) => {
  return String.fromCharCode(leters.A + index)
}

const greateRow = (colOrCell, index) => {
  const count = index == null ? '' : index
  const resizeRow = index
  ? `<div class="resize-row" data-resize="row"></div>`
  : ''
  return `<div class="row" data-type="resize">
      <div class="row-info"  >
        ${count}
        ${resizeRow}
      </div>  
      <div class="row-data">
            ${colOrCell}
          </div>  
      </div>
  `
}
const column = (el, index) => {
  return `
  <div class="column" data-type="resize" data-count="${index}">
    ${el}
    <div class="resize-col" data-resize="col"></div>
  </div>
  
  `
}
const cell = (rows, index) => {
  return `
  <div class="cell" contenteditable="" data-count=${index} data-rowAndCell="${rows + ':' + index}">
  
  </div>
  `
  // selected
}

export function createTable(row = 2) {
  const table = []
  const letersCount = leters.Z - leters.A + 1
  const columns = new Array(letersCount)
      .fill()
      .map( (_, index) => capitalaze(index))
      .map( (e, index) => column(e, index) )
      .join('')
  table.push(greateRow(columns))
  for (let rows = 0; rows < row; rows++) {
    const cells = new Array(letersCount)
        .fill('')
        .map((_, index) => cell( rows, index))
        .join('')
    table.push(greateRow(cells, rows + 1))
  }
  return table.join('')
}


