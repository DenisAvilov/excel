export class TableSelected {
 static className = 'selected'
 constructor() {
   this.acentCell = []
   this.startGroup = null
 }

 select($cell) {
   this.clear()
   $cell.focus().classAdd(TableSelected.className)
   this.acentCell.push($cell)
   this.startGroup = $cell
 }

 clear() {
   this.acentCell.forEach( el => el.classDel(TableSelected.className))
   this.acentCell = []
 }
 selectGroup($cells ) {
   this.clear()
   this.acentCell = $cells
   this.acentCell.forEach(el => el.classAdd(TableSelected.className))
 }
}
