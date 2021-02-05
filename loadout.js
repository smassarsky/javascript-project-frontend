class Loadout {

  static all = []

  static findById = (id) => Loadout.all.find(loadout => loadout.id === parseInt(id))
  
  static findIndexById = (id) => Loadout.all.indexOf(loadout => loadout.id === parseInt(id))
  
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
    const checkFirst = this.findLoadoutItemById(loadoutItem.id)
    if (!checkFirst) {
      this.loadoutItems.push(new LoadoutItem(Object.assign(loadoutItem, {loadout: this})))
      return this.loadoutItems[this.loadoutItems.length - 1]
    } else {
      return checkFirst.update(loadoutItem)
    }
  }

  removeLoadoutItem = (loadoutItem) => {
    return this.loadoutItems.splice(this.loadoutItems.indexOf(testLoadoutItem => testLoadoutItem.id === loadoutItem.id), 1)
  }

  destroy = () => {
    Loadout.all.splice(Loadout.findIndexById(this.id), 1)
    this.loadoutItems.forEach(loadoutItem => loadoutItem.destroy())
    this.userGameTableDiv.remove()

    if (this.userGame.loadouts.length === 1) {
      this.userGame.appendNoLoadoutHolder()
    }

    this.userGame.removeLoadout(this)
  }

  findLoadoutItemById = (id) => this.loadoutItems.find(item => item.id === id)

  findItemById = (id) => {
    console.log(id, this)
    return this.items.find(item => item.id === id)
  }

  static emptyLoadoutsRow = () => {
    return "<tr><td colspan='2'>No loadouts created yet</td></tr>"
  }

  renderUserGameTableDiv(...options) {
    if (options.length === 0) {
      options = ["Show", "Edit Name", "Delete"]
    }
    const div = document.createElement('div')
    div.id = `user-game-loadout-div-${this.id}`
    div.innerHTML = `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">${this.name}</td>
          <td class="col-6">${this.optionButtons(options)}</td>
        </tr>
      </table>
    `
    this.userGameTableDiv = div
    return div
  }

  optionButtons(options) {
    return options.map(option => `<button data-loadout-id="${this.id}" class="btn btn-sm btn-primary me-3 ${option.toLowerCase().split(" ").join("-")}-button">${option}</button>`).join('')
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

  renderShowPage = () => {
    this.loadoutShowDiv = this.renderShowDiv()
    this.showPageHeaderDiv = this.renderShowPageHeaderDiv()
    this.loadoutItemTableContainer = this.renderLoadoutItemTableContainer()
    this.noLoadoutItemHolder = this.renderNoLoadoutItemHolder()

    this.loadoutShowDiv.append(this.showPageHeaderDiv, this.loadoutItemTableContainer)
  }

  renderShowDiv = () => {
    const loadoutShowDiv = document.createElement('div')
    loadoutShowDiv.id = `loadout-show-div-${this.id}`
    loadoutShowDiv.classList.add('mt-3')
    loadoutShowDiv.addEventListener('click', LoadoutItemAdapter.loadoutItemTableSwitcher)
    return loadoutShowDiv
  }

  renderShowPageHeaderDiv = () => {
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

  renderLoadoutItemTableContainer = () => {
    const loadoutItemTableContainer = document.createElement('div')
    loadoutItemTableContainer.id = `loadout-item-table-container-${this.id}`
    loadoutItemTableContainer.classList.add('table-responsive', 'mb-3', 'text-center')

    const loadoutItemTableHeaders = document.createElement('table')
    loadoutItemTableHeaders.classList.add('table', 'mb-0')
    loadoutItemTableHeaders.innerHTML = `
      <thead>
        <tr>
          <th class="col-3">Name</th>
          <th class="col-2">Quantity</th>
          <th class="col-4">Note</th>
          <th class="col-3">Actions</th>
        </tr>
      </thead>
    `

    this.loadoutItemTableHolder = document.createElement('div')
    this.loadoutItemTableHolder.id = `loadout-item-table-holder-${this.id}`

    loadoutItemTableContainer.append(loadoutItemTableHeaders, this.loadoutItemTableHolder)
    return loadoutItemTableContainer
  }

  renderNoLoadoutItemHolder = () => {
    const noLoadoutItemHolder = document.createElement('div')
    noLoadoutItemHolder.innerHTML = `<table class="table text-center mb-0"<tbody><tr><td>No Loadout Items Created Yet</td></tr></tbody></table>`
    return noLoadoutItemHolder
  }

  renderLoadoutItemTable = () => {
    if (this.loadoutItems.length > 0) {
      this.loadoutItemTableHolder.append(...this.loadoutItems.map(loadoutItem => loadoutItem.tableDiv))
    } else {
      this.appendNoLoadoutItemHolder()
    }
  }

  appendNoLoadoutItemHolder = () => {
    this.loadoutItemTableContainer.append(this.noLoadoutItemHolder)
  }

  removeNoLoadoutItemHolder = () => {
    this.noLoadoutItemHolder.remove()
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