class Recipe {

  constructor({id, ingredients = []}) {
    this.id = id
    this.ingredients = []
    ingredients.forEach(ingredient => this.ingredients.push(new Ingredient(ingredient)))
    return this
  }

}