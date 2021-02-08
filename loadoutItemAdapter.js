class LoadoutItemAdapter {
 
  static baseURL = `${SessionAdapter.baseURL}/loadout_items`

  // method used to create LoadoutItem with new or existing Item
  static createLoadoutItem = ({loadout, quantity, itemId, name, note, target}) => {
    loadout.resetMessages()
    let itemAttributes
    if (itemId) {
      itemAttributes = { item_id: itemId }
    } else {
      itemAttributes = { item_attributes: {name: name, note: note, user_game_id: loadout.userGame.id }}
    }
    fetch(`${this.baseURL}`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        loadout_item: Object.assign({
          loadout_id: loadout.id,
          quantity: quantity
        }, itemAttributes)
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        const newLoadoutItem = loadout.addLoadoutItem(json)
        target.remove()
        loadout.tableBody.prepend(newLoadoutItem.tableRow)
        loadout.success("Loadout Item Added!")
      } else {
        loadout.failure(json.error)
      }
    })
  }

  // create LoadoutItem with new Item
  static addLoadoutItemNew = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
    this.createLoadoutItem({
      loadout: loadout,
      quantity: e.target.quantity.value,
      name: e.target.name.value,
      note: e.target.note.value,
      target: e.target
    })
  }

  // create LoadoutItem with existing Item
  static addLoadoutItemExisting = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
    this.createLoadoutItem({
      loadout: loadout, 
      quantity: e.target.quantity.value,
      itemId: e.target.name.value,
      target: e.target
    })
  }

  static editLoadoutItem = (e) => {
    e.preventDefault()
    const loadoutItem = LoadoutItem.findById(parseInt(e.target.dataset.loadoutItemId))
    loadoutItem.resetMessages()
    fetch(`${this.baseURL}/${loadoutItem.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        loadout_item: {
          quantity: parseInt(e.target.quantity.value),
          item_attributes: {
            id: loadoutItem.item.id,
            name: e.target.name.value,
            note: e.target.note.value
          }
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        loadoutItem.update(json)
        e.target.replaceWith(loadoutItem.tableRow)
        loadoutItem.success("Item Updated!")
      } else {
        loadoutItem.failure(json.error)
      }
    })
  }

  static deleteLoadoutItem = (id) => {
    const loadoutItemToDelete = LoadoutItem.findById(id)
    loadoutItemToDelete.resetMessages()
    
    fetch(`${this.baseURL}/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        loadoutItemToDelete.success("Loadout Item Deleted")
        loadoutItemToDelete.tableRow.remove()
        loadoutItemToDelete.destroy()
      } else {
        loadoutItemToDelete.failure(json.error)
      }
    })
  }

  static removeLoadoutItemForm = (e) => {
    document.querySelector(`#loadout-item-form-${e.target.dataset.counter}`).remove()
  }

  static loadoutItemTableSwitcher = (e) => {
    switch (e.target.dataset.targetClass) {
      case ('loadout'):
        LoadoutAdapter.switcher(e)
        break
      case ('loadout-item'):
        this.switcher(e)
        break
      case ('item'):
        ItemAdapter.switcher(e)
        break
      case ('ingredient'):
        IngredientAdapter.switcher(e)
        break
    }
  }

  static switcher = (e) => {
    switch (e.target.dataset.buttonType) {
      case ('remove-form'):
        this.removeLoadoutItemForm(e)
        break
      case ('edit'):
        this.editRow(e.target.dataset.loadoutItemId)
        break
      case ('cancel-edit'):
        this.removeEditRow(e.target.dataset.loadoutItemId)
        break
      case ('delete'):
        this.deleteLoadoutItem(e.target.dataset.loadoutItemId)
        break
    }
  }

  static editRow = (id) => {
    const loadoutItemToEdit = LoadoutItem.findById(id)
    loadoutItemToEdit.resetMessages()
    loadoutItemToEdit.tableRow.replaceWith(loadoutItemToEdit.renderEditForm())
  }

  static removeEditRow = (loadoutItemId) => {
    const targetLoadoutItem = LoadoutItem.findById(loadoutItemId)
    targetLoadoutItem.editForm.replaceWith(targetLoadoutItem.tableRow)
  }

}