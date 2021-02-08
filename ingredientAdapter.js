class IngredientAdapter {
  
  static baseURL = `${SessionAdapter.baseURL}/ingredients`

  static createIngredient = ({item, quantity, reagentId, name, note, target}) => {
    this.resetMessages()
    let reagentAttributes
    if (reagentId) {
      reagentAttributes = { reagent_id: reagentId }
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
        item.ingredientsTableRows.prepend(newIngredient.tableRow)
        this.success("Ingredient Added!")
      } else {
        this.failure(json.error)
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
    console.log(e.target)
    const item = Item.findById(e.target.dataset.itemId)
    this.createIngredient({
      item: item,
      quantity: e.target.quantity.value,
      reagentId: e.target.name.value,
      target: e.target
    })
  }

  static update = (e) => {
    e.preventDefault()
    this.resetMessages()
    const ingredient = Ingredient.findById(e.target.dataset.ingredientId)
    fetch(`${this.baseURL}/${ingredient.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ingredient: {
          quantity: e.target.quantity.value,
          reagent_attributes: {
            id: ingredient.reagent.id,
            name: e.target.name.value,
            note: e.target.note.value
          }
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        ingredient.update(json)
        ingredient.editForm.replaceWith(ingredient.reRenderTableRow())
        this.success("Ingredient Updated!")
      } else {
        this.failure(json.error)
      }
    })
  }

  static destroy = (e) => {
    this.resetMessages()
    const ingredient = Ingredient.findById(e.target.dataset.ingredientId)
    fetch(`${this.baseURL}/${ingredient.id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        ingredient.destroy()
        document.querySelector('.text-success').innerHTML = "Ingredient Deleted!"
      } else {
        document.querySelector('.text-danger').innerHTML = json.error
      }
    })
  }

  static switcher = (e) => {
    switch (e.target.dataset.buttonType) {
      case ('edit'):
        Ingredient.findById(e.target.dataset.ingredientId).renderEditForm()
        console.log('TODO Edit ingredient')
        break
      case ('delete'):
        this.destroy(e)
        console.log('TODO delete ingredient')
        break
      case ('remove-form'):
        this.removeForm(e)
        break
      case ('cancel-edit'):
        Ingredient.findById(e.target.dataset.ingredientId).cancelEditForm()
        break
    }
  }

  static removeForm = (e) => {
    document.querySelector(`#ingredient-form-${e.target.dataset.counter}`).remove()
  }

  static resetMessages = () => {
    document.querySelector('.text-success').innerHTML = ""
    document.querySelector('.text-danger').innerHTML = ""
  }

  static success = (message) => {
    document.querySelector('.text-success').innerHTML = message
  }

  static failure = (message) => {
    document.querySelector('.text-danger').innerHTML = message
  }

}