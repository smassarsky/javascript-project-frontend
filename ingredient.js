class Ingredient {

  static all = []

  static findById = (id) => this.all.find(ingredient => ingredient.id === parseInt(id))
  static findIndexById = (id) => this.all.findIndex(ingredient => ingredient.id === parseInt(id))

  constructor({item, json: { id, quantity, reagent }}) {
    const checkFirst = Ingredient.findById(id)
    if (!checkFirst) {
      this.id = id
      this.quantity = quantity
      this.reagent = new Item(Object.assign(reagent, {userGame: item.userGame}))
      this.reagent.addAsReagent(this)
      this.item = item
      Ingredient.all.push(this)
      return this
    } else {
      checkFirst.update({quantity, reagent})
      return checkFirst
    }
  }

  get name() {
    return this.reagent.name
  }

  get note() {
    return this.reagent.note
  }

  update = ({quantity, reagent}) => {
    if (quantity && quantity != this.quantity) {
      this.quantity = quantity
    }
    this.reagent.update(reagent)
    return this
  }

  destroy = () => {
    this.item.removeIngredient(this)
    Ingredient.all.splice(Ingredient.findIndexById(this.id), 1)
    this.tableRow.remove()
  }

  get tableRow() {
    return this._tableRow = this._tableRow || this.renderTableRow()
  }

  reRenderTableRow = () => {
    return this._tableRow = this.renderTableRow()
  }

  renderTableRow = () => {
    const tableRow = document.createElement('table')
    tableRow.id = `ingredient-row-${this.id}`
    tableRow.classList.add('table', 'mb-0')
    tableRow.innerHTML = IngredientTemplates.tableData(this)
    return tableRow
  }

  renderEditForm = () => {
    const newEditForm = document.createElement('form')
    newEditForm.id = `edit-ingredient-form-${this.id}`
    newEditForm.dataset.ingredientId = `${this.id}`
    newEditForm.innerHTML = IngredientTemplates.editFormHtml(this)
    newEditForm.addEventListener('submit', IngredientAdapter.update)
    this.tableRow.replaceWith(newEditForm)
    this.editForm = newEditForm 
  }

  cancelEditForm = () => {
    this.editForm.replaceWith(this.tableRow)
  }
  
}