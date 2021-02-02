class Item {

  static all = []

  static findById = (id) => Item.all.find(item => item.id === id)
  static findIndexById = (id) => Item.all.indexOf(item => item.id === id)

  constructor({id, name, note = "", ingredients = [], userGameId, loadoutId}) {
    const checkFirst = Item.findById(id)
    if (!checkFirst){
      this.id = id
      this.name = name
      this.note = note
      this.userGameId = userGameId
      this.loadoutIds = [loadoutId]
      this.ingredients = []

      ingredients.forEach(ingredient => this.ingredients.push(new Item(ingredient)))
      Item.all.push(this)
      return this
    } else {
      checkFirst.update({name: name, note: note, ingredients: ingredients})
      return checkFirst
    }
  }

  get userGame() {
    return UserGame.findById(this.userGameId)
  }

  get loadouts() {
    return this.loadoutIds.map(id => Loadout.findById(id))
  }

  update({name, note, ingredients = [], userGameId, loadoutId}) {
    if (name && name != this.name) {
      this.name = name
    }
    if (note && note != this.note) {
      this.note = note
    }
    if (ingredients.length > 0 && ingredients.map(ing => ing.id) != this.ingredients.map(ing => ing.id)) {
      this.ingredients = []
      ingredients.forEach(ingredient => this.ingredients.push(new Item(ingredient)))
    }
    if (userGameId && userGameId != this.userGameId) {
      this.userGameId = userGameId
    }
    if (loadoutId && !this.loadoutIds.includes(loadoutId)) {
      this.loadoutIds.push(loadoutId)
    }
  }

  destroy = () => {
    Item.all.splice(Item.findIndexById(this.id), 1)
  }

  itemTableRow = (...options) => {
    if (options.length === 0) {
      options = ["Ingredients", "Edit", "Delete"]
    }
    const row = document.createElement('tr')
    row.id = `item-row-${this.id}`
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