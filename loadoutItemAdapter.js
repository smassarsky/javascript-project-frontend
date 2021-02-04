class LoadoutItemAdapter {
 
  static baseURL = `${SessionAdapter.baseURL}/loadout_items`

  // method used to create LoadoutItem with new or existing Item
  static createLoadoutItem = ({loadout, quantity, itemId, name, note, target}) => {
    this.resetMessages()
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
        document.querySelector('#loadout-item-table-body').prepend(newLoadoutItem.tableRow())
        this.success("Loadout Item Added!")
      } else {
        this.failure(json.error)
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
    this.resetMessages()
    const loadoutItem = LoadoutItem.findById(parseInt(e.target.dataset.loadoutItemId))
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
        e.target.remove()
        document.querySelector('#loadout-item-table-body').prepend(loadoutItem.tableRow())
        this.success("Item Updated!")
      } else {
        this.failure(json.error)
      }
    })
  }

  static removeLoadoutItemForm = (e) => {
    e.preventDefault()
    document.querySelector(`#loadout-item-form-${e.target.dataset.counter}`).remove()
  }

  static loadoutItemTableSwitcher = (e) => {
    e.preventDefault()
    switch (true) {
      case (e.target.classList.contains("edit-button")):
        this.editRow(e.target.dataset.loadoutItemId)
        break
      case (e.target.classList.contains("delete-button")):
        this.deleteLoadoutItem(e.target.dataset.loadoutItemId)
        break
      case (e.target.classList.contains("new-ingredient-button")):
        console.log("TODO new ingredient")
        break
      case (e.target.classList.contains("existing-ingredient-button")):
        console.log("TODO existing ingredient")
        break
    }
  }

  static editRow = (id) => {
    this.resetMessages()
    const loadoutItemToEdit = LoadoutItem.findById(parseInt(id))
    document.querySelector('#loadout-item-table-headers').after(LoadoutItemTemplates.editForm(loadoutItemToEdit))
    document.querySelector(`#loadout-item-row-${id}`).remove()
  }

  static removeEditRow = (e) => {
    e.preventDefault()
    const targetLoadoutItem = LoadoutItem.findById(parseInt(e.target.dataset.loadoutItemId))
    document.querySelector(`#edit-loadout-item-form-${e.target.dataset.loadoutItemId}`).remove()
    document.querySelector('#loadout-item-table-body').prepend(targetLoadoutItem.tableRow())
  }

  static deleteLoadoutItem = (id) => {
    this.resetMessages()
    const loadoutItemToDelete = LoadoutItem.findById(parseInt(id))
    fetch(`${this.baseURL}/${id}`, {
      method: "DELETE",
      credentials: "include"
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        this.success("Loadout Item Deleted")
        document.querySelector(`#loadout-item-row-${loadoutItemToDelete.id}`).remove()
        loadoutItemToDelete.destroy()
      } else {
        this.failure(json.error)
      }
    })
  }

  static resetMessages() {
    document.querySelector('#loadout-item-success-div').innerHTML = ""
    document.querySelector('#loadout-item-error-div').innerHTML = ""
  }

  static success(message) {
    document.querySelector('#loadout-item-success-div').innerHTML = message
  }

  static failure(message) {
    document.querySelector('#loadout-item-error-div').innerHTML = message
  }

}