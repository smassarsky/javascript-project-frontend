class Item {

  static all = []

  static findById = (id) => Item.all.find(item => item.id === parseInt(id))

  static findIndexById = (id) => Item.all.findIndex(item => item.id === parseInt(id))

  constructor({id, name, note = "", ingredients = [], userGame, loadoutItem}) {
    const checkFirst = Item.findById(id)
    if (!checkFirst){
      this.id = id
      this.name = name
      this.note = note
      this.userGame = userGame
      this.loadoutItems = loadoutItem ? [loadoutItem] : [] 
      this.ingredients = []
      this.formCounter = 0

      if (ingredients && ingredients.length > 0) {
        ingredients.forEach(ingredient => this.addIngredient(ingredient))
      }
      Item.all.push(this)
      return this
    } else {
      checkFirst.update({name: name, note: note, ingredients: ingredients, loadoutItem: loadoutItem})
      return checkFirst
    }
  }

  update({name, note, ingredients = [], loadoutItem}) {

    if (name) {
      this.name = name

    }
    if (note != undefined) {
      this.note = note

    }
    if (ingredients.length > 0 && ingredients.map(ing => ing.id) != this.ingredients.map(ing => ing.id)) {
      this.ingredients = []
      ingredients.forEach(ingredient => this.addIngredient(ingredient))

    }
    if (loadoutItem) {
      this.addLoadoutItem(loadoutItem)

    }
  }

  findLoadoutItemById = (id) => this.loadoutItems.find(loadoutItem => loadoutItem.id === id)
  findIndexLoadoutItemById = (id) => this.loadoutItems.findIndex(loadoutItem => loadoutItem.id === id)

  findIngredientById = (id) => this.ingredients.find(ingredient => ingredient.id === id)
  findIndexIngredientById = (id) => this.ingredients.findIndex(ingredient => ingredient.id === id)

  addLoadoutItem = (loadoutItem) => {
    if (!this.findLoadoutItemById(loadoutItem.id)) {
      this.loadoutItems.push()
    }
  }

  removeLoadoutItem = (loadoutItem) => {
    return this.loadoutItems.splice(this.findIndexLoadoutItemById(loadoutItem.id), 1)
  }

  addIngredient = (ingredientJson) => {
    console.log(ingredientJson)
    const checkFirst = this.findIngredientById(ingredientJson.id)
    if (!checkFirst) {
      const newIngredient = new Ingredient({item: this, json: ingredientJson})
      this.ingredients.push(newIngredient)
      return newIngredient
    } else {
      return checkFirst.update(ingredientJson)
    }
  }

  removeIngredient = (ingredientObj) => {
    this.ingredients.splice(this.findIndexIngredientById(ingredientObj.id), 1)
    ingredientObj.destroy()
  }

  destroy = () => {
    Item.all.splice(Item.findIndexById(this.id), 1)
    this.loadoutItems.forEach(loadoutItem => loadoutItem.destroy())
    this.ingredients.forEach(ingredient => ingredient.destroy())
  }

  // Ingredients Table elements
  // All elements have a render method called by "private" getter method
  //
  // ingredientsDiv
  //  |ingredientsHeaderAndOptions
  //  ----------------------------------------------
  //  |ingredientsTable
  //    |ingredientsTableHead
  //    --------------------------------------------
  //    |ingredientsTableRows
  //      |ingredient.tableRow (for each ingredient)
  //      --------OR--------------------------------          
  //      |noIngredientsRow (if no ingredients)


  get ingredientsDiv() {
    return this._ingredientsDiv = this._ingredientsDiv || this.renderIngredientsDiv()
  }

  reRenderIngredientsDiv = () => {
    const newIngredientsDiv = this.renderIngredientsDiv()
    this.ingredientsDiv.parentNode.replaceChild(newIngredientsDiv, this.ingredientsDiv)
  }

  renderIngredientsDiv = () => {
    const ingredientsDiv = document.createElement('div')
    ingredientsDiv.id = `item-ingredients-div-${this.id}`
    ingredientsDiv.classList.add('collapse', 'mb-3')

    ingredientsDiv.append(this.ingredientsHeaderAndOptions, this.ingredientsTable)
    return ingredientsDiv
  }

  get ingredientsHeaderAndOptions() {
    return this._ingredientsHeaderAndOptions = this._ingredientsHeaderAndOptions || this.renderIngredientsHeaderAndOptions()
  }

  renderIngredientsHeaderAndOptions = () => {
    const header = document.createElement('div')
    header.id = `ingredient-table-headers-div-${this.id}`
    header.innerHTML = ItemTemplates.tableHeaderAndOptions(this)
    return header
  }

  get ingredientsTable() {
    return this._ingredientsTable = this._ingredientsTable || this.renderIngredientsTable()
  }

  renderIngredientsTable = () => {
    const tableHolder = document.createElement('div')
    tableHolder.id = `ingredients-table-${this.id}`
    tableHolder.classList.add('container', 'table-responsive')

    tableHolder.append(this.ingredientsTableHead, this.ingredientsTableRows)

    return tableHolder
  }

  get ingredientsTableHead() {
    return this._ingredientsTableHead = this._ingredientsTableHead || this.renderIngredientsTableHead()
  }

  renderIngredientsTableHead = () => {
    const thead = document.createElement('table')
    thead.classList.add('table', 'mb-0')
    thead.innerHTML = ItemTemplates.ingredientTHead()
    return thead
  }

  get ingredientsTableRows() {
    return this._ingredientsTableRows = this._ingredientsTableRows || this.renderIngredientsTableRows()
  }

  renderIngredientsTableRows = () => {
    const rowsHolder = document.createElement('div')
    rowsHolder.classList.add('table-responsive')
    if (this.ingredients.length > 0) {
      rowsHolder.append(...this.ingredients.map(ingredient => ingredient.tableRow))
    } else {
      rowsHolder.append(this.noIngredientsRow)
    }
    return rowsHolder
  }

  get noIngredientsRow() {
    return this._noIngredientsRow = this._noIngredientsRow || this.renderNoIngredientsRow()
  }

  renderNoIngredientsRow = () => {
    const noIngredientsRow = document.createElement('table')
    noIngredientsRow.classList.add('table', 'mb-0')
    noIngredientsRow.innerHTML = ItemTemplates.noIngredientsHtml()
    return noIngredientsRow
  }

  optionElement = () => {
    const element = document.createElement('option')
    element.value = this.id
    element.innerHTML = this.name
    return element
  }

  newIngredientForm = () => {
    const newForm = document.createElement('form')
    newForm.id = `new-ingredient-form-${this.id}-${this.formCounter}`
    newForm.dataset.itemId = this.id
    newForm.innerHTML = IngredientTemplates.newForm(this)
    newForm.addEventListener('submit', IngredientAdapter.addNew)
    this.ingredientsTableRows.prepend(newForm)
    this.formCounter++
  }

}