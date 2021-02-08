class LoadoutItem {

  static all = []

  static findById = (id) => LoadoutItem.all.find(loadoutItem => loadoutItem.id === parseInt(id))
  static findIndexById = (id) => LoadoutItem.all.findIndex(loadoutItem => loadoutItem.id === parseInt(id))

  constructor({id, quantity, item, loadout}) {
    const checkFirst = LoadoutItem.findById(id)
    if (!checkFirst){
      this.id = id
      this.quantity = quantity
      this.loadout = loadout
      this.item = new Item(Object.assign(item, {userGame: loadout.userGame}))
      this.userGame.addItem(this.item)
      LoadoutItem.all.push(this)
      return this
    } else {
      checkFirst.update({quantity: quantity, item: item, loadout: loadout})
      return checkFirst
    }
  }

  update({quantity, item}) {
    if (quantity && quantity !== this.quantity){
      this.quantity = quantity
    }
    this.item = new Item(item)
    if (this._tableRow) {
      this.reRenderTableRow()
    }
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
  
  // table row for loadout show page
  // all elements have a render method called by getter method
  //
  //  tableRow
  //    |details
  //    --------------------
  //    |ingredientsDiv (collapse div, passed to Item)
  //

  get tableRow() {
    return this._tableRow = this._tableRow || this.renderTableRow()
  }

  reRenderTableRow = () => {
    while (this._tableRow.firstChild) {
      this._tableRow.removeChild(this._tableRow.firstChild)
    }
    this._tableRow.append(this.reRenderDetails(), this.ingredientsDiv)
  }

  renderTableRow = () => {
    const row = document.createElement('div')
    row.id = `loadout-item-div-${this.id}`
    row.classList.add('border-bottom', 'bootstrap-table-border')

    row.append(this.details, this.ingredientsDiv)

    return row
  }

  get details() {
    return this._details = this._details || this.renderDetails()
  }

  reRenderDetails = () => {
    return this._details = this.renderDetails()
  }

  renderDetails = () => {
    const detailTable = document.createElement('table')
    detailTable.classList.add('table', 'mb-0', 'accordion-table', 'text-center')
    detailTable.id = `loadout-item-row-${this.id}`
    detailTable.innerHTML = LoadoutItemTemplates.detailRowHtml(this)
    return detailTable
  }

  get ingredientsDiv() {
    return this.item.ingredientsDiv
  }

  optionButtons() {
    return 
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
    const newEditForm = document.createElement('form')
    newEditForm.id = `edit-loadout-item-form-${this.id}`
    newEditForm.dataset.loadoutItemId = `${this.id}`
    newEditForm.innerHTML = LoadoutItemTemplates.editFormHtml(this)
    newEditForm.addEventListener('submit', LoadoutItemAdapter.editLoadoutItem)
    return this.editForm = newEditForm
  }

  static newForm = (loadoutId) => {
    const loadout = Loadout.findById(loadoutId)
    const newLoadoutItemForm = document.createElement('form')
    newLoadoutItemForm.id = `loadout-item-form-${loadout.id}-${loadout.formCounter}`
    newLoadoutItemForm.dataset.loadoutId = loadout.id
    newLoadoutItemForm.dataset.counter = loadout.formCounter
    newLoadoutItemForm.innerHTML = LoadoutItemTemplates.newFormHtml(loadout)
    newLoadoutItemForm.addEventListener('submit', LoadoutItemAdapter.addLoadoutItemNew)
    loadout.tableBody.prepend(newLoadoutItemForm)
    loadout.formCounter++
  }

  static existingForm = (loadoutId) => {
    const loadout = Loadout.findById(loadoutId)
    const existingForm = document.createElement('form')
    existingForm.id = `loadout-item-form-${loadout.id}-${loadout.formCounter}`
    existingForm.dataset.counter = loadout.formCounter
    existingForm.dataset.loadoutId = loadout.id
    existingForm.innerHTML = LoadoutItemTemplates.existingFormHtml(loadout)
    existingForm.addEventListener('submit', LoadoutItemAdapter.addLoadoutItemExisting)
    loadout.tableBody.prepend(existingForm)

    const dropDown = document.querySelector(`#existing-item-name-${loadout.id}-${loadout.formCounter}`)

    ItemAdapter.fetchUserGameItemsTruncated(loadout.userGame)
    .then(() => {
      loadout.userGame.items.forEach(item => dropDown.appendChild(item.optionElement()))
      dropDown.addEventListener('change', (e) => {
        const item = Item.findById(e.target.value)
        document.querySelector(`#existing-item-note-${e.target.dataset.counter}`).innerHTML = item.note
      })
    })
    loadout.formCounter++
  }

}