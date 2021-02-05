class LoadoutItem {

  static all = []

  static findById = (id) => LoadoutItem.all.find(loadoutItem => loadoutItem.id === parseInt(id))
  static findIndexById = (id) => LoadoutItem.all.indexOf(loadoutItem => loadoutItem.id === parseInt(id))

  constructor({id, quantity, item, loadout}) {
    const checkFirst = LoadoutItem.findById(id)
    if (!checkFirst){
      this.id = id
      this.quantity = quantity
      this.loadout = loadout
      this.item = new Item(Object.assign(item, {userGame: loadout.userGame}))
      
      this.renderPageLoad()

      LoadoutItem.all.push(this)
      return this
    } else {
      checkFirst.update({quantity: quantity, item: item, loadout: loadout})
      return checkFirst
    }
  }

  update({quantity, item}) {
    this.quantity = quantity
    this.item = new Item(item)
    this.renderDetailTable()
    return this
  }

  destroy = () => {
    LoadoutItem.all.splice(LoadoutItem.findIndexById(this.id), 1)
    this.loadout.removeLoadoutItem(this)
  }

  get name() {
    return this.item.name
  }

  get note() {
    return this.item.note
  }

  get userGame() {
    return this.loadout.userGame
  }

  get itemId() {
    return this.item.id
  }
  
  renderPageLoad = () => {
    this.tableDiv = this.renderTableDiv()
    this.detailTable = this.renderDetailTable()
    this.ingredientsDiv = this.renderIngredientsDiv()
    this.ingredientTableHeader = this.renderIngredientTableHeader()
    this.ingredientsHolderDiv = this.renderIngredientsHolderDiv()

    this.tableDiv.append(this.detailTable, this.ingredientsDiv)
    this.ingredientsDiv.append(this.ingredientTableHeader, this.ingredientsHolderDiv)

    this.ingredientsHolderDiv.append(this.item.ingredientTable)
  }

  renderTableDiv = () => {
    const div = document.createElement('div')
    div.id = `loadout-item-div-${this.id}`
    div.classList.add('border-bottom', 'bootstrap-table-border')
    return div
  }

  renderDetailTable = () => {
    const detailTable = document.createElement('table')
    detailTable.classList.add('table', 'mb-0', 'accordion-table', 'text-center')
    detailTable.id = `loadout-item-row-${this.id}`
    detailTable.innerHTML = `
      <tr>
        <td class="col-3">${this.name}</td>
        <td class="col-2">${this.quantity}</td>
        <td class="col-4">${this.note}</td>
        <td class="col-3">${this.optionButtons()}</td>
      </tr>
    `
    return detailTable
  }

  renderIngredientsDiv = () => {
    const ingredientsDiv = document.createElement('div')
    ingredientsDiv.id = `loadout-item-ingredient-div-${this.id}`
    ingredientsDiv.classList.add('collapse')
    return ingredientsDiv
  }

  optionButtons() {
    return `
      <button type="button" data-bs-toggle="collapse" data-bs-target="#loadout-item-ingredient-div-${this.id}" data-loadout-item-id="${this.id}" class="btn btn-sm btn-primary me-3 ingredient-toggle-button">Ingredients</button>
      <button type="button" data-loadout-item-id="${this.id}" class="btn btn-sm btn-primary me-3 edit-button">Edit</button>
      <button type="button" data-loadout-item-id="${this.id}" class="btn btn-sm btn-primary me-3 delete-button">Delete</button>
    `
  }

  renderIngredientTableHeader = () => {
    const header = document.createElement('div')
    header.id = `ingredient-table-headers-div-${this.id}`
    header.innerHTML = `
      <h4>Ingredients</h4>
      <button type="button" id="add-new-ingredient-${this.id}" class="btn btn-sm btn-primary me-3 new-ingredient-button">Add New Ingredient</button>
      <button type="button" id="add-existing-ingredient-${this.id}" class="btn btn-sm btn-primary existing-ingredient-button">Add Existing Ingredient</button>
    `
    return header
  }

  renderIngredientsHolderDiv = () => {
    const ingredientsHolderDiv = document.createElement('div')
    ingredientsHolderDiv.id = `ingredients-holder-div-${this.id}`
    return ingredientsHolderDiv
  }

  resetMessages = () => {
    this.loadout.resetMessages()
  }

  success = (message) => {
    this.loadout.success(message)
  }

  failure = (message) => {
    this.loadout.failure(message)
  }

  renderEditForm = () => {
    this.editForm = LoadoutItemTemplates.editForm(this)
    return this.editForm
  }

  // renderEditForm = () => {
  //   const editForm = document.createElement('form')
  //   editForm.id = `edit-loadout-item-form-${this.id}`
  //   editForm.dataset.loadoutItemId = this.id
    
  // }

  // renderEditFormInnards = () => {
  //   const table = document.createElement('table')

  // }

  // tableRow = (...options) => {
    // if (options.length === 0) {
    //   options = ["Ingredients", "Edit", "Delete"]
    // }

    // const div = document.createElement('div')
    // div.id = `loadout-item-div-${this.id}`
    // div.classList.add('border-bottom', 'bootstrap-table-border')

    // const detailTable = document.createElement('table')
    // detailTable.classList.add('table', 'mb-0', 'accordion-table')
    // detailTable.id = `loadout-item-row-${this.id}`
    // detailTable.innerHTML = `
    //   <tr>
    //     <td class="col-3">${this.name}</td>
    //     <td class="col-2">${this.quantity}</td>
    //     <td class="col-4">${this.note}</td>
    //     <td class="col-3">${this.optionButtons()}</td>
    //   </tr>
    // `

    // div.appendChild(detailTable)


    // const ingredientDiv = document.createElement('div')
    // ingredientDiv.id = `loadout-item-ingredient-div-${this.id}`
    // ingredientDiv.classList.add('collapse')
    
    // div.appendChild(ingredientDiv)

    // const ingredientHeader = document.createElement('h3')
    // ingredientHeader.innerText = "Ingredients"

    // ingredientDiv.appendChild(ingredientHeader)

    // const headerOptions = document.createElement('div')
    // ingredientDiv.appendChild(headerOptions)
    // headerOptions.innerHTML = `
    //   <button type="button" id="add-new-ingredient-${this.id}" class="btn btn-sm btn-primary me-3 new-ingredient-button">Add New Ingredient</button>
    //   <button type="button" id="add-existing-ingredient-${this.id}" class="btn btn-sm btn-primary existing-ingredient-button">Add Existing Ingredient</button>
    // `

    // const ingredientsTableHolder = document.createElement('div')


    // return div
  // }

  // optionButtons(options) {
  //   return options.map(option => `<button type="button" data-loadout-item-id="${this.id}" class="btn btn-sm btn-primary me-3 ${option.toLowerCase().split(" ").join("-")}-button">${option}</button>`).join('')
  // }



}