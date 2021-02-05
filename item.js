class Item {

  static all = []

  static findById = (id) => Item.all.find(item => item.id === parseInt(id))

  static findIndexById = (id) => Item.all.indexOf(item => item.id === parseInt(id))

  constructor({id, name, note = "", ingredients = [], userGame, loadoutItem}) {
    const checkFirst = Item.findById(id)
    if (!checkFirst){
      this.id = id
      this.name = name
      this.note = note
      this.userGame = userGame
      this.loadoutItems = loadoutItem ? [loadoutItem] : [] 
      this.ingredients = []

      if (ingredients && ingredients.length > 0) {
        ingredients.forEach(ingredient => this.ingredients.push(new Item(ingredient)))
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
      ingredients.forEach(ingredient => this.ingredients.push(new Item(ingredient)))
    }
    if (loadoutItem) {
      this.addLoadoutItem(loadoutItem)
    }
  }

  findLoadoutItemById = (id) => this.loadoutItems.find(loadoutItem => loadoutItem.id === id)
  indexOfLoadoutItemById = (id) => this.loadoutItems.indexOf(lodoutItem => loadoutItem.id === id)

  findIngredientById = (id) => this.ingredients.find(ingredient => ingredient.id === id)
  indexOfIngredientById = (id) => this.ingredients.indexOf(ingredient => ingredient.id === id)

  addLoadoutItem = (loadoutItem) => {
    if (!this.findLoadoutItemById(loadoutItem.id)) {
      this.loadoutItems.push()
    }
  }

  removeLoadoutItem = (loadoutItem) => {
    return this.loadoutItems.splice(this.indexOfLoadoutItemById(loadoutItem.id), 1)
  }

  addIngredient = (ingredientJson) => {
    const checkFirst = findIngredientById(ingredientJson.id)
    if (!checkFirst) {
      this.ingredients.push(new Ingredient(ingredientJson))
    } else {
      checkFirst.update(ingredientJson)
    }
  }

  removeIngredient = (ingredientObj) => {
    this.ingredients.splice(this.indexOfIngredientById(ingredientObj.id), 1)
    ingredientObj.destroy()
  }

  destroy = () => {
    Item.all.splice(Item.findIndexById(this.id), 1)
    this.loadoutItems.forEach(loadoutItem => loadoutItem.destroy())
    this.ingredients.forEach(ingredient => ingredient.destroy())
  }

  renderIngredientTable = () => {


  }
  // itemTableRow = (...options) => {
  //   if (options.length === 0) {
  //     options = ["Ingredients", "Edit", "Delete"]
  //   }
  //   const row = document.createElement('tr')
  //   row.id = `item-row-${this.id}`
  //   row.innerHTML = `
  //     <td class="col-3">${this.name}</td>
  //     <td class="col-2">${this.quantity}</td>
  //     <td class="col-4">${this.note}</td>
  //     <td class="col-3">${this.optionButtons(options)}</td>
  //   `
  //   return row
  // }

  // optionButtons(options) {
  //   return options.map(option => `<button data-item-id="${this.id}" class="btn btn-sm btn-primary me-3 ${option.toLowerCase().split(" ").join("-")}-button">${option}</button>`).join('')
  // }

  optionElement = () => {
    const element = document.createElement('option')
    element.value = this.id
    element.innerHTML = this.name
    return element
  }

}