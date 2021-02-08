class ItemAdapter {

  static baseURL = `${SessionAdapter.baseURL}/items`

  static createNewItem = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
    fetch(ItemAdapter.baseURL, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        loadout_id: loadout.id,
        item: {
          name: e.target.name.value,
          quantity: parseInt(e.target.quantity.value),
          note: e.target.note.value
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        const newItem = new Item(json)
        loadout.items.push(newItem)
        e.target.remove()
        document.querySelector('#item-table-body').prepend(newItem.itemTableRow())
      } else {
        document.querySelector('#item-error-div').innerHTML = json.error
      }
    })
  }

  static removeItemForm = (e) => {
    e.preventDefault()
    document.querySelector(`#new-item-form-${e.target.dataset.counter}`).remove()
  }

  // from loadoutitem table
  static switcher = (e) => {
    switch (e.target.dataset.buttonType) {
      case ('new-ingredient'):
        Item.findById(e.target.dataset.itemId).newIngredientForm()
        break
      case ('existing-ingredient'):
        Item.findById(e.target.dataset.itemId).existingIngredientForm()
        break
    }
  }

  static editRow = (id) => {
    const item_to_edit = Item.findById(parseInt(id))
    document.querySelector('#item-table-headers').after(ItemTemplates.editItemForm(item_to_edit))
    document.querySelector(`#item-row-${id}`).remove()
  }

  static removeEditRow = (e) => {
    e.preventDefault()
    const targetItem = Item.findById(parseInt(e.target.dataset.itemId))
    document.querySelector(`#edit-item-form-${e.target.dataset.itemId}`).remove()
    document.querySelector('#item-table-body').prepend(targetItem.itemTableRow())
  }



  static resetMessages() {
    document.querySelector('#item-success-div').innerHTML = ""
    document.querySelector('#item-error-div').innerHTML = ""
  }

  static fetchUserGameItemsTruncated = (userGame) => {
    if (!userGame.fetchedAllItems) {
      return fetch(`${UserGameAdapter.baseURL}/${userGame.id}/items`, { credentials: 'include'})
      .then(resp => resp.json())
      .then(json => {
        json.forEach(itemJson => userGame.addItem(itemJson))
        userGame.fetchedAllItems = true
        return json
      })
    }
    else {
      return Promise.resolve()
    }
  }

}