class LoadoutAdapter {

  static baseURL = `${SessionAdapter.baseURL}/loadouts`

  static newLoadoutPage = (e) => {
    console.log(e.target, e.target.dataset.id)
    const userGame = UserGame.findById(parseInt(e.target.dataset.id))
    const infoContainer = document.querySelector('#user-game-info-container')
    infoContainer.innerHTML = LoadoutTemplates.newLoadoutHtml(userGame)
    document.querySelector('#new-loadout-form').addEventListener('submit', this.createNewLoadout)
  }

  static newLoadoutFormRow = (e) => {
    const noLoadoutHolder = document.querySelector('#no-loadout-holder')
    if (noLoadoutHolder) {
      noLoadoutHolder.remove()
    }
    const newLoadoutForm = document.createElement('form')
    const numRows = document.querySelectorAll('#loadout-table-container form').length
    newLoadoutForm.id = `new-loadout-form-${numRows}`
    newLoadoutForm.dataset.id = `${e.target.dataset.id}`
    newLoadoutForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">
            <label for="new-loadout-name-${numRows}" class="visually-hidden">New Loadout Name</label>
            <input id="new-loadout-name-${numRows}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary">Create Loadout</button>
          </td>
        </tr>
      </table>
    `
    document.querySelector('#loadout-table-headers').after(newLoadoutForm)
    document.querySelector(`#new-loadout-form-${numRows}`).addEventListener('submit', this.createNewLoadout)
  }

  static createNewLoadout = (e) => {
    e.preventDefault()
    fetch(this.baseURL, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_game_id: parseInt(e.target.dataset.id),
        name: e.target.name.value
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.error) {
        document.querySelector('#loadout-error-div').innerHTML = json.error
      } else {
        e.target.remove()
        this.addLoadoutToTable(json)
      }
    })
    .catch(error => console.error(error))
  }

  static addLoadoutToTable = (loadoutJson) => {
    const loadoutObj = new Loadout(loadoutJson)
    document.querySelector('#loadout-table-body').prepend(loadoutObj.renderTableRow())
  }

  static loadoutTableSwitcher = (e) => {
    e.preventDefault()
    switch(true) {
      case e.target.classList.contains("show-button"):
        this.loadoutShowPage(e.target.dataset.id)
        break
      case e.target.classList.contains("edit-name-button"):
        this.editNameRow(e.target.dataset.id)
        break
      case e.target.classList.contains("delete-button"):
        this.deleteLoadout(e.target.dataset.id)
        break
    }
  }

  static editNameRow(id) {
    const loadout = Loadout.findById(parseInt(id))
    document.querySelector('#loadout-table-headers').after(loadout.editLoadoutNameForm())
    document.querySelector(`#loadout-row-${id}`).remove()
  }

  static editLoadoutName = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.id))
    fetch(`${this.baseURL}/${loadout.id}`, {
      method: "PATCH", 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        id: loadout.id,
        name: e.target.name.value
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        loadout.update(json)
        e.target.remove()
        document.querySelector('#loadout-table-body').prepend(loadout.renderTableRow())
      } else {
        document.querySelector('#loadout-error-div').innerHTML = json.error
      }
    })
  }

  static deleteLoadout = (id) => {
    const loadout = Loadout.findById(parseInt(id))
    fetch(`${this.baseURL}/${loadout.id}`, {
      method: "DELETE", 
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        document.querySelector(`#loadout-row-${loadout.id}`).remove()
        loadout.destroy()
        if (Loadout.all.length === 0) {
          document.querySelector('#loadout-table-body').innerHTML = LoadoutTemplates.noLoadoutHolderHtml()
        }
      } else {
        document.querySelector('#loadout-error-div').innerHTML = json.error
      }
    })
  }

  static loadoutShowPage(id) {
    const infoContainer = document.querySelector('#user-game-info-container')
    const loadout = Loadout.findById(parseInt(id))
    infoContainer.innerHTML = LoadoutTemplates.loadoutShowPageHtml(loadout)
    this.fetchItemsAndIngredients(loadout)
    document.querySelector('#new-item-button').addEventListener('click', ItemTemplates.addItemForm)
  }

  static fetchItemsAndIngredients(loadout) {
    fetch(`${this.baseURL}/${loadout.id}/items`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error){
        json['loadout_items'].forEach(loadoutItem => {
          loadout.addOrUpdateItem(loadoutItem)
        })
        LoadoutTemplates.loadItemsTableHtml(loadout)
      } else {
        console.error("error")
      }
    })
  }

}