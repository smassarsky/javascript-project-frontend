class LoadoutItem {

  static all = []

  static findById = (id) => LoadoutItem.all.find(loadoutItem => loadoutItem.id === id)
  static findIndexById = (id) => LoadoutItem.all.indexOf(loadoutItem => loadoutItem.id === id)

  constructor({id, quantity, item, loadout}) {
    console.log(loadout)
    const checkFirst = LoadoutItem.findById(id)
    if (!checkFirst){
      this.id = id
      this.quantity = quantity
      this.loadout = loadout
      this.item = new Item(Object.assign(item, {userGame: loadout.userGame}))

      LoadoutItem.all.push(this)
      return this
    } else {
      checkFirst.update({quantity: quantity, item: item, loadout: loadout})
      return checkFirst
    }
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
  
  update({quantity, item}) {
    this.quantity = quantity
    this.item = new Item(item)
  }

  destroy = () => {
    LoadoutItem.all.splice(LoadoutItem.findIndexById(this.id), 1)
    this.loadout.removeLoadoutItem(this)
  }

  tableRow = (...options) => {
    if (options.length === 0) {
      options = ["Ingredients", "Edit", "Delete"]
    }
    const row = document.createElement('tr')
    row.id = `loadout-item-row-${this.id}`
    row.innerHTML = `
      <td class="col-3">${this.name}</td>
      <td class="col-2">${this.quantity}</td>
      <td class="col-4">${this.note}</td>
      <td class="col-3">${this.optionButtons(options)}</td>
    `
    return row
  }

  optionButtons(options) {
    return options.map(option => `<button data-id="${this.id}" class="btn btn-sm btn-primary me-3 ${option.toLowerCase().split(" ").join("-")}-button">${option}</button>`).join('')
  }

}