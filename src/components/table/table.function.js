import {range} from './../../core/until'
export const resize = (event) => {
  return event.target.dataset.resize
}
export const eventCell = (event) => {
  return event.target.dataset.rowandcell
}

export const matrixCell = (event, col, row, maxcol, maxrow) => {
  switch (event) {
    case 'ArrowRight':
    case 'Tab':
      col === maxcol ? col = maxcol: col++
      break
    case 'ArrowDown':
    case 'Enter':
      row === maxrow ? row = maxrow : row++
      break
    case 'ArrowUp':
      row === 0 ? row = 0 : row--
      break;
    case 'ArrowLeft':
      col === 0 ? col = 0: col--
      break
  }
  return `[data-rowAndCell="${row}:${col}"]`
}

export const matrixGroup = ($target, $startGroup) => {
  const target = $target.idCell(true)
  const startGroup = $startGroup.idCell(true)
  const colNew = range(startGroup.col, target.col )
  const rowNew = range(startGroup.row, target.row )
  return colNew.reduce((previousValue, currentValue)=> {
    rowNew.forEach( row => previousValue.push(row + ':' + currentValue) )
    return previousValue
  }, [])
}

