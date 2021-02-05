class LoadoutAdapter {

  static baseURL = `${SessionAdapter.baseURL}/loadouts`

  // static newLoadoutPage = (e) => {
  //   console.log(e.target, e.target.dataset.id, e.target.dataset.userGameId)
  //   const userGame = UserGame.findById(parseInt(e.target.dataset.userGameId))
  //   const infoContainer = document.querySelector('#user-game-info-container')
  //   infoContainer.innerHTML = LoadoutTemplates.newLoadoutHtml(userGame)
  //   document.querySelector('#new-loadout-form').addEventListener('submit', this.createNewLoadout)
  // }

  static newLoadoutFormRow = (id) => {
    const userGame = UserGame.findById(parseInt(id))

    const newLoadoutForm = document.createElement('form')

    newLoadoutForm.id = `new-loadout-form-${userGame.formCounter}`
    newLoadoutForm.dataset.userGameId = `${userGame.id}`
    newLoadoutForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">
            <label for="new-loadout-name-${userGame.formCounter}" class="visually-hidden">New Loadout Name</label>
            <input id="new-loadout-name-${userGame.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary me-3">Create Loadout</button>
            <button type="button" data-counter="${userGame.formCounter}" class="btn btn-sm btn-primary remove-button">Remove</button>
          </td>
        </tr>
      </table>
    `
    userGame.loadoutTableBody.prepend(newLoadoutForm)
    newLoadoutForm.addEventListener('submit', this.createNewLoadout)
    userGame.formCounter++
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
        const newLoadout = userGame.addLoadout(json)
        e.target.after(newLoadout.renderUserGameTableDiv())
        e.target.remove()
        if (userGame.loadoutsTableContainer.contains(userGame.noLoadoutHolder)) {
          userGame.noLoadoutHolder.remove()
        }
      }
    })
    .catch(error => console.error(error))
  }

  static loadoutTableSwitcher = (e) => {
    
    switch(true) {
      case e.target.classList.contains("new-loadout-button"):
        e.preventDefault()
        this.newLoadoutFormRow(e.target.dataset.userGameId)
        break
      case e.target.classList.contains("remove-button"):
        e.preventDefault()
        this.removeFormRow(e.target.dataset.counter)
        break
      case e.target.classList.contains("show-button"):
        e.preventDefault()
        this.loadoutShowPage(e.target.dataset.loadoutId)
        break
      case e.target.classList.contains("edit-name-button"):
        e.preventDefault()
        this.editNameRow(e.target.dataset.loadoutId)
        break
      case e.target.classList.contains("delete-button"):
        e.preventDefault()
        this.deleteLoadout(e.target.dataset.loadoutId)
        break
      case e.target.classList.contains("cancel-edit-button"):
        e.preventDefault()
        this.cancelEditForm(e.target.dataset.loadoutId)
        break
    }
  }

  static editNameRow(id) {
    const loadout = Loadout.findById(id)
    const div = document.querySelector(`#user-game-loadout-div-${id}`)
    div.innerHTML = ""
    div.append(loadout.editLoadoutNameForm())
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
        loadout.editLoadoutForm.parentNode.replaceWith(loadout.renderUserGameTableDiv())
        loadout.editLoadoutForm.innerHTML = ""
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
        loadout.destroy()
      } else {
        document.querySelector('#loadout-error-div').innerHTML = json.error
      }
    })
  }

  static loadoutShowPage(id) {
    const loadout = Loadout.findById(id)
    loadout.renderShowPage()
    loadout.userGame.infoContainer.replaceWith(loadout.loadoutShowDiv)
    this.fetchItemsAndIngredients(loadout)
  }

  static fetchItemsAndIngredients(loadout) {
    fetch(`${this.baseURL}/${loadout.id}/loadout_items`, { credentials: 'include' })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error){
        json['loadout_items'].forEach(loadoutItem => {
          loadout.addLoadoutItem(loadoutItem)
        })
        loadout.renderLoadoutItemTable()
      } else {
        console.error("error")
      }
    })
  }

  static resetItemTableMessages() {
    document.querySelector('#loadout-item-success-div').innerHTML = ""
    document.querySelector('#loadout-item-error-div').innerHTML = ""
  }

  static removeFormRow(id) {
    document.querySelector(`#new-loadout-form-${id}`).remove()
  }

  static cancelEditForm(id) {
    const loadout = Loadout.findById(id)
    loadout.editLoadoutForm.parentNode.replaceWith(loadout.renderUserGameTableDiv())
  }

}