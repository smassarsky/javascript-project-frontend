class LoadoutItemAdapter {
 
  static baseURL = `${SessionAdapter.baseURL}/loadout_items`

  static createLoadoutItem = ({loadout, quantity, itemId, name, note}) => {
    let itemAttributes = { user_game_id: loadout.userGame.id }
    if (itemId) {
      itemAttributes = Object.assign(itemAttributes, { id: itemId })
    } else {
      itemAttributes = Object.assign(itemAttributes, { name: name, note: note })
    }
    console.log(itemAttributes)
    return fetch(`${LoadoutAdapter.baseURL}/${loadout.id}/loadout_items`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        loadout_item: {
          quantity: quantity,
          item_attributes: itemAttributes
        }
      })
    })
    .then(resp => resp.json())
  }

  static addLoadoutItemNew = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
    fetch(`${LoadoutAdapter.baseURL}/${loadout.id}/loadout_items`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        loadout_item: {
          quantity: parseInt(e.target.quantity.value),
          item_attributes: {
            name: e.target.name.value,
            note: e.target.note.value,
            user_game_id: loadout.userGame.id
          }
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
      if (!json.error) {
        const newLoadoutItem = new LoadoutItem(Object.assign(json, {loadout: loadout}))
        loadout.addLoadoutItem(newLoadoutItem)
        if (document.querySelector('#no-loadout-item-holder')) {
          document.querySelector('#no-loadout-item-holder').remove()
        }
        e.target.remove()
        document.querySelector('#loadout-item-table-body').prepend(newLoadoutItem.tableRow())
        document.querySelector('#loadout-item-success-div').innerHTML = "Item Created!"
      } else {
        document.querySelector('#loadout-item-error-div').innerHTML = json.error
      }
    })
  }

  static addLoadoutItemExisting = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
    this.createLoadoutItem({loadout: loadout, 
                            quantity: e.target.quantity.value,
                            itemId: e.target.name.value})
    .then(json => {
      console.log(json, loadout)
      loadout.addLoadoutItem(json)
    })
    
    //{loadout, quantity, item, name, note}
  }

  static editLoadoutItem = (e) => {
    e.preventDefault()
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
        console.log(json)
        loadoutItem.update(json)
        e.target.remove()
        document.querySelector('#loadout-item-table-body').prepend(loadoutItem.tableRow())
        document.querySelector('#loadout-item-success-div').innerHTML = "Item Updated!"
      } else {
        document.querySelector('#loadout-item-error-div').innerHTML = json.error
      }
    })

    console.log("edit loadout item")
  }

  static removeLoadoutItemForm = (e) => {
    e.preventDefault()
    document.querySelector(`#loadout-item-form-${e.target.dataset.counter}`).remove()
  }

  static loadoutItemTableSwitcher = (e) => {
    e.preventDefault()
    switch (true) {
      case (e.target.classList.contains("ingredients-button")):
        console.log("toggle ingredients")
        break
      case (e.target.classList.contains("edit-button")):
        this.editRow(e.target.dataset.loadoutItemId)
        break
      case (e.target.classList.contains("delete-button")):
        this.deleteLoadoutItem(e.target.dataset.loadoutItemId)
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
        document.querySelector('#loadout-item-success-div').innerHTML = "Loadout Item Deleted"
        document.querySelector(`#loadout-item-row-${loadoutItemToDelete.id}`).remove()
        loadoutItemToDelete.destroy()
      } else {
        document.querySelector('#loadout-item-error-div').innerHTML = json.error
      }
    })
  }

  static resetMessages() {
    document.querySelector('#loadout-item-success-div').innerHTML = ""
    document.querySelector('#loadout-item-error-div').innerHTML = ""
  }

}