class Loadout {

  static all = []

  static findById = (id) => Loadout.all.find(loadout => loadout.id === id)
  static findIndexById = (id) => Loadout.all.indexOf(loadout => loadout.id === id)
  
  constructor({id, name, loadoutItems = [], userGame}) {
    const checkFirst = Loadout.findById(id)
      if (!checkFirst) {
      this.id = id
      this.name = name
      this.userGame = userGame
      this.loadoutItems = []

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
    } else {
      checkFirst.update(loadoutItem)
    }
  }

  removeLoadoutItem = (loadoutItem) => {
    return this.loadoutItems.splice(this.loadoutItems.indexOf(testLoadoutItem => testLoadoutItem.id === loadoutItem.id), 1)
  }

  addOrUpdateItem = (loadoutItem) => {
    const checkFirst = this.findItemById(loadoutItem.item.id)
    const params = Object.assign({quantity: loadoutItem.quantity}, loadoutItem.item)
    if (!checkFirst) {
      this.items.push(new Item(params))
    } else {
      checkFirst.update(params)
    }
  }

  destroy = () => {
    Loadout.all.splice(Loadout.findIndexById(this.id), 1)
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

  renderTableRow(...options) {
    if (options.length === 0) {
      options = ["Show", "Edit Name", "Delete"]
    }
    const row = document.createElement('tr')
    row.id = `loadout-row-${this.id}`
    row.innerHTML = `<td class="col-6">${this.name}</td><td class="col-6">${this.optionButtons(options)}</td>`
    return row
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
            <button type="submit" class="btn btn-sm btn-primary">Edit Name</button>
          </td>
        </tr>
      </table>
    `
    newEditLoadoutNameForm.addEventListener('submit', LoadoutAdapter.editLoadoutName)
    return newEditLoadoutNameForm
  }

}