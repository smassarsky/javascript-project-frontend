class Item {

  static all = []

  static findById = (id) => Item.all.find(item => item.id === id)

  constructor({id, name, note = "", quantity, ingredients = []}) {
    const checkFirst = Item.findById(id)
    if (!checkFirst){
      this.id = id
      this.name = name
      this.note = note
      this.quantity = quantity
      this.ingredients = []

      ingredients.forEach(ingredient => this.ingredients.push(new Item(ingredient)))
      Item.all.push(this)
      return this
    } else {
      checkFirst.update({id: id, name: name, note: note, quantity: quantity, ingredient: ingredients})
      return checkFirst
    }
  }

  update({name, note = "", quantity, ingredients = []}) {
    this.name = name
    this.note = note
    this.quantity = quantity
    this.ingredients = []
    if (ingredients.length > 0) {
      ingredients.forEach(ingredient => this.ingredients.push(new Item(ingredient)))
    }
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