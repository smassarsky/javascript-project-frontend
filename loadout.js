class Loadout {

  static all = []

  static findById = (id) => Loadout.all.find(loadout => loadout.id === parseInt(id))
  
  static findIndexById = (id) => Loadout.all.findIndex(loadout => loadout.id === parseInt(id))
  
  constructor({id, name, loadoutItems = [], userGame}) {
    const checkFirst = Loadout.findById(id)
      if (!checkFirst) {
      this.id = id
      this.name = name
      this.userGame = userGame
      this.loadoutItems = []
      this.formCounter = 0



      loadoutItems.forEach(function(loadoutItem) {
        console.log(this)
        this.loadoutItems.push(new LoadoutItem(Object.assign(loadoutItem, {loadout: this})))
      }, this)
      Loadout.all.push(this)
      return this
    } else {
      checkFirst.update({name: name, loadoutItems: loadoutItems})
      return checkFirst
    }
  }

  update = ({name, loadoutItems = []}) => {
    console.log(loadoutItems)
    if (name) {
      this.name = name
    }
    loadoutItems.forEach(loadoutItem => this.addLoadoutItem(loadoutItem))
    return this
  }

  addLoadoutItem = (loadoutItem) => {
    if (this.loadoutItems.length === 0) {
      this.removeNoLoadoutItemRow()
    }
    const checkFirst = this.findLoadoutItemById(loadoutItem.id)
    if (!checkFirst) {
      this.loadoutItems.push(new LoadoutItem(Object.assign(loadoutItem, {loadout: this})))
      return this.loadoutItems[this.loadoutItems.length - 1]
    } else {
      return checkFirst.update(loadoutItem)
    }
  }

  removeLoadoutItem = (loadoutItem) => {
    this.loadoutItems.splice(this.findIndexLoadoutItemById(loadoutItem.id), 1)
    if (this.loadoutItems.length === 0) {
      this.appendNoLoadoutItemRow()
    }
  }

  destroy = () => {
    Loadout.all.splice(Loadout.findIndexById(this.id), 1)
    this.loadoutItems.forEach(loadoutItem => loadoutItem.destroy())
    this.userGameTableDiv.remove()
    this.userGame.removeLoadout(this)
  }

  findLoadoutItemById = (id) => this.loadoutItems.find(item => item.id === parseInt(id))
  findIndexLoadoutItemById = (id) => this.loadoutItems.findIndex(loadoutItem => loadoutItem.id === parseInt(id))

  findItemById = (id) => this.items.find(item => item.id === id)
  findIndexItemById = (id) => this.items.findIndex(item => item.id === id)

  static emptyLoadoutsRow = () => {
    return "<tr><td colspan='2'>No loadouts created yet</td></tr>"
  }

  get userGameTableDiv() {
    return this._userGameTableDiv = this._userGameTableDiv || this.renderUserGameTableDiv()
  }

  renderUserGameTableDiv() {
    const options = ["Show", "Edit Name", "Delete"]
    const div = document.createElement('div')
    div.id = `user-game-loadout-div-${this.id}`
    div.innerHTML = LoadoutTemplates.userGameTableDivHtml(this)
    return div
  }

  editLoadoutNameForm = () => {
    const newEditLoadoutNameForm = document.createElement('form')
    newEditLoadoutNameForm.dataset.loadoutId = this.id
    newEditLoadoutNameForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">
            <label for="edit-loadout-name-${this.id}" class="visually-hidden">Edit Loadout Name</label>
            <input id="edit-loadout-name-${this.id}" class="form-control" type="text" name="name" value="${this.name}" placeholder="Name">
          </td>
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary me-3">Edit Name</button>
            <button type="button" class="btn btn-sm btn-primary cancel-edit-button" data-loadout-id="${this.id}">Cancel</button>
          </td>
        </tr>
      </table>
    `
    newEditLoadoutNameForm.addEventListener('submit', LoadoutAdapter.editLoadoutName)
    this.editLoadoutForm = newEditLoadoutNameForm
    return newEditLoadoutNameForm
  }

  // renderShowPage = () => {
  //   this.loadoutShowDiv = this.renderShowDiv()
  //   this.showPageHeaderDiv = this.renderShowPageHeaderDiv()
  //   this.loadoutItemTableContainer = this.renderLoadoutItemTableContainer()
  //   this.noLoadoutItemHolder = this.renderNoLoadoutItemHolder()

  //   this.loadoutShowDiv.append(this.showPageHeaderDiv, this.loadoutItemTableContainer)
  // }

  // show page information for a loadout.  loads under the usergame card container
  // all elements have a render method called by getter method
  //
  //  showDiv
  //    |showPageHeaders
  //    ------------
  //    |loadoutItemContainer
  //      |tableHeaders
  //      -------------------
  //      |tableBody
  //


  get showDiv() {
    return this._showDiv = this._showDiv || this.renderShowDiv()
  }

  renderShowDiv = () => {
    const showDiv = document.createElement('div')
    showDiv.id = `loadout-show-div-${this.id}`
    showDiv.classList.add('mt-3')
    showDiv.addEventListener('click', LoadoutItemAdapter.loadoutItemTableSwitcher)

    showDiv.append(this.showPageHeaders, this.loadoutItemContainer)

    return showDiv
  }

  get showPageHeaders() {
    return this._showPageHeaders = this._showPageHeaders || this.renderShowPageHeaders()
  }

  renderShowPageHeaders = () => {
    const showPageHeaderDiv = document.createElement('div')
    showPageHeaderDiv.id = `loadout-header-${this.id}`
    showPageHeaderDiv.classList.add('text-center')

    const h2 = document.createElement('h2')
    h2.innerText = `${this.name}`

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('mb-3')
    buttonDiv.innerHTML = `
      <button data-loadout-id="${this.id}" class="btn btn-sm btn-primary me-3 new-loadout-item-button">New Loadout Item</button>
      <button data-loadout-id="${this.id}" class="btn btn-sm btn-primary existing-loadout-item-button">Add Existing Loadout Item</button>
    `

    this.successDiv = document.createElement('div')
    this.successDiv.classList.add('text-success')

    this.failureDiv = document.createElement('div')
    this.failureDiv.classList.add('text-danger')

    showPageHeaderDiv.append(h2, buttonDiv, this.successDiv, this.failureDiv)

    return showPageHeaderDiv
  }

  get loadoutItemContainer() {
    return this._loadoutItemContainer = this._loadoutItemContainer || this.renderLoadoutItemContainer()
  }

  renderLoadoutItemContainer = () => {
    const loadoutItemTableContainer = document.createElement('div')
    loadoutItemTableContainer.id = `loadout-item-table-container-${this.id}`
    loadoutItemTableContainer.classList.add('table-responsive', 'mb-3', 'text-center')

    loadoutItemTableContainer.append(this.tableHeaders, this.tableBody)
    return loadoutItemTableContainer
  }

  get tableHeaders() {
    return this._tableHeaders = this._tableHeaders || this.renderTableHeaders()
  }

  renderTableHeaders = () => {
    const tableHeaders = document.createElement('table')
    tableHeaders.classList.add('table', 'mb-0')
    tableHeaders.innerHTML = `
      <thead>
        <tr>
          <th class="col-3">Name</th>
          <th class="col-2">Quantity</th>
          <th class="col-4">Note</th>
          <th class="col-3">Actions</th>
        </tr>
      </thead>
    `
    return tableHeaders
  }

  get tableBody() {
    return this._tableBody = this._tableBody || this.renderTableBody()
  }

  reRenderTableBody = () => {
    const oldTableBody = this._tableBody
    this._tableBody = this.renderTableBody()
    oldTableBody.replaceWith(this._tableBody)
  }

  renderTableBody = () => {
    const tableBody = document.createElement('div')
    tableBody.id = `loadout-item-table-body-${this.id}`

    if (this.loadoutItems.length > 0) {
      tableBody.append(...this.loadoutItems.map(loadoutItem => loadoutItem.tableRow))
    } else {
      tableBody.append(this.noLoadoutItemRow)
    }
    return tableBody
  }

  get noLoadoutItemRow() {
    return this._noLoadoutItemRow = this._noLoadoutItemRow || this.renderNoLoadoutItemRow()
  }

  renderNoLoadoutItemRow = () => {
    const noLoadoutItemRow = document.createElement('div')
    noLoadoutItemRow.innerHTML = `<table class="table text-center mb-0"<tbody><tr><td>No Loadout Items Created Yet</td></tr></tbody></table>`
    return noLoadoutItemRow
  }

  appendNoLoadoutItemRow = () => {
    this.tableBody.append(this.noLoadoutItemRow)
  }

  removeNoLoadoutItemRow = () => {
    this.noLoadoutItemRow.remove()
  }

  resetMessages = () => {
    this.successDiv.innerHTML = ""
    this.failureDiv.innerHTML = ""
  }

  success = (message) => {
    this.successDiv.innerHTML = message
  }

  failure = (message) => {
    this.failureDiv.innerHTML = message
  }
  

}