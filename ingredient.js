class Ingredient {

  static all = []

  static findById = (id) => this.all.find(ingredient => ingredient.id === parseInt(id))
  static findIndexById = (id) => this.all.findIndex(ingredient => ingredient.id === parseInt(id))

  constructor({item, json: { id, quantity, reagent }}) {
    console.log(id, quantity, item, reagent)
    const checkFirst = Ingredient.findById(id)
    if (!checkFirst) {
      this.id = id
      this.quantity = quantity
      this.reagent = new Item(Object.assign(reagent, {userGame: item.userGame}))
      this.item = item
      Ingredient.all.push(this)
      return this
    } else {
      checkFirst.update({quantity, item})
      return checkFirst
    }
  }

  get name() {
    return this.reagent.name
  }

  get note() {
    return this.reagent.note
  }

  update = ({quantity, item}) => {

    return this
  }

  get tableRow() {
    return this._tableRow = this._tableRow || this.renderTableRow()
  }

  renderTableRow = () => {
    const tableRow = document.createElement('table')
    tableRow.id = `ingredient-row-${this.id}`
    tableRow.classList.add('table', 'mb-0')
    tableRow.innerHTML = IngredientTemplates.tableData(this)
    return tableRow
  }


  
}