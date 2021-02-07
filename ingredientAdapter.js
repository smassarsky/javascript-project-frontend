class IngredientAdapter {
  
  static baseURL = `${SessionAdapter.baseURL}/ingredients`

  static createIngredient = ({item, quantity, reagentId, name, note, target}) => {
    let reagentAttributes
    if (reagentId) {
      reagentAttributes = { reagent_attributes: { reagent_id: reagentId, user_game_id: item.userGame.id }}
    } else {
      reagentAttributes = { reagent_attributes: { name, note, user_game_id: item.userGame.id}}
    }
    fetch(this.baseURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ingredient: Object.assign({
          item_id: item.id,
          quantity: quantity
        }, reagentAttributes)
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if(!json.error) {
        const newIngredient = item.addIngredient(json)
        target.remove()
        item.ingredientTableRows.prepend(newIngredient.tableRow)
        item.success("Ingredient Added!")
      } else {
        item.failure(json.error)
      }
    })
  }

  static addNew = (e) => {
    e.preventDefault()
    console.log(e, this)
    const item = Item.findById(e.target.dataset.itemId)
    this.createIngredient({
      item: item,
      quantity: e.target.quantity.value,
      name: e.target.name.value,
      note: e.target.note.value,
      target: e.target
    })

  }

  static addExisting = (e) => {
    e.preventDefault()
    const item = Item.findById(e.target.dataset.itemId)
    this.createIngredient({
      item: item,
      quantity: e.target.quantity.value,
      reagentId: e.target.name.value,
      target: e.target
    })
  }

  static switcher = (e) => {
    switch (e.target.dataset.buttonType) {
      case ('edit'):
        console.log('TODO Edit ingredient')
        break
      case ('delete'):
        console.log('TODO delete ingredient')
        break
    }
  }

}