class Ingredient {

  static all = []

  static findById = (id) => this.all.find(ingredient => ingredient.id === parseInt(id))

  static findByIndex = (id) => this.all.indexOf(ingredient => ingredient.id === parseInt(id))

  constructor({id, quantity, item}) {
    const checkFirst = Ingredient.findById(parseInt(id))
    if (!checkFirst) {
      this.id = parseInt(id)
      this.quantity = quantity
      this.item = item
      Ingredient.all.push(this)
      return this
    } else {
      checkFirst.update({quantity, item})
      return checkFirst
    }
  }


  
}