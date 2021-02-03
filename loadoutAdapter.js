class LoadoutAdapter {

  static baseURL = `${SessionAdapter.baseURL}/loadouts`

  static newLoadoutPage = (e) => {
    console.log(e.target, e.target.dataset.id, e.target.dataset.userGameId)
    const userGame = UserGame.findById(parseInt(e.target.dataset.userGameId))
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
    newLoadoutForm.dataset.userGameId = `${e.target.dataset.userGameId}`
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
    const userGame = UserGame.findById(parseInt(e.target.dataset.userGameId))
    fetch(this.baseURL, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user_game_id: userGame.id,
        name: e.target.name.value
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.error) {
        document.querySelector('#loadout-error-div').innerHTML = json.error
      } else {
        e.target.remove()
        this.addLoadoutToTable(json, userGame)
      }
    })
    .catch(error => console.error(error))
  }

  static addLoadoutToTable = (loadoutJson, userGame) => {
    const newLoadout = userGame.addLoadout(loadoutJson)
    document.querySelector('#loadout-table-body').prepend(newLoadout.renderTableRow())
  }

  static loadoutTableSwitcher = (e) => {
    e.preventDefault()
    switch(true) {
      case e.target.classList.contains("show-button"):
        this.loadoutShowPage(e.target.dataset.loadoutId)
        break
      case e.target.classList.contains("edit-name-button"):
        this.editNameRow(e.target.dataset.loadoutId)
        break
      case e.target.classList.contains("delete-button"):
        this.deleteLoadout(e.target.dataset.loadoutId)
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
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
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
    document.querySelector('#loadout-item-table-body').addEventListener('click', LoadoutItemAdapter.loadoutItemTableSwitcher)
    document.querySelector('#new-loadout-item-button').addEventListener('click', LoadoutItemTemplates.newForm)
    document.querySelector('#add-existing-loadout-item-button').addEventListener('click', LoadoutItemTemplates.addExistingForm)
  }

  static fetchItemsAndIngredients(loadout) {
    fetch(`${this.baseURL}/${loadout.id}/loadout_items`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error){
        console.log(json)
        json['loadout_items'].forEach(loadoutItem => {
          loadout.addLoadoutItem(loadoutItem)
        })
        LoadoutTemplates.loadLoadoutItemsTableHtml(loadout)
      } else {
        console.error("error")
      }
    })
  }

  static resetItemTableMessages() {
    document.querySelector('#loadout-item-success-div').innerHTML = ""
    document.querySelector('#loadout-item-error-div').innerHTML = ""
  }

}