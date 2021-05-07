export class TableSelected {
 static className = 'selected'
 constructor() {
   this.acentCell = []
   this.startGroup = null
 }

 select($cell) {
   this.clear()
   this.acentCell.push($cell)
   this.acentCell.forEach(el => el.classAdd(TableSelected.className) )
 }

 clear() {
   this.acentCell.forEach( el => el.classDel(TableSelected.className))
   this.acentCell = []
 }
}
