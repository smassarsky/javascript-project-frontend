class LoadoutAdapter {

  static baseURL = `${SessionAdapter.baseURL}/loadouts`

  static newLoadoutFormRow = (id) => {
    const userGame = UserGame.findById(id)
    const newLoadoutForm = document.createElement('form')
    newLoadoutForm.id = `new-loadout-form-${userGame.id}-${userGame.formCounter}`
    newLoadoutForm.dataset.userGameId = `${userGame.id}`
    newLoadoutForm.innerHTML = LoadoutTemplates.newLoadoutFormHtml(userGame)
    userGame.loadoutsTableBody.prepend(newLoadoutForm)
    newLoadoutForm.addEventListener('submit', this.createNewLoadout)
    userGame.formCounter++
  }

  static createNewLoadout = (e) => {
    e.preventDefault()
    const userGame = UserGame.findById(e.target.dataset.userGameId)
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
        userGame.loadoutsFailureDiv.innerHTML = json.error
      } else {
        const newLoadout = userGame.addLoadout(json)
        e.target.after(newLoadout.userGameTableDiv)
        e.target.remove()
        if (userGame.loadoutsTableContainer.contains(userGame.noLoadoutHolder)) {
          userGame.noLoadoutHolder.remove()
        }
      }
    })
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
    const loadout = Loadout.findById(id)
    fetch(`${this.baseURL}/${loadout.id}`, {
      method: "DELETE", 
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        loadout.destroy()
      } else {
        loadout.userGame.loadoutsFailureDiv.innerHTML = json.error
      }
    })
  }

  // related to show page load
  static fetchItemsAndIngredients = (loadout) => {
    if (!loadout.initialFetch) {
      return fetch(`${this.baseURL}/${loadout.id}/loadout_items`, { credentials: 'include' })
      .then(resp => resp.json())
      .then(json => {
        if (!json.error) {
          json['loadout_items'].forEach(loadoutItem => loadout.addLoadoutItem(loadoutItem))
        } else {
          console.error("error")
        }
        loadout.initialFetch = true
      })
    } else {
      return Promise.resolve(42)
    }
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
        Loadout.findById(e.target.dataset.loadoutId).loadShowPage()
        break
      case e.target.classList.contains("edit-button"):
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

  // related to loadoutitem table in show page
  static switcher(e) {
    switch (e.target.dataset.buttonType) {
      case ('new'):
        LoadoutItem.newForm(e.target.dataset.loadoutId)
        break
      case ('existing'):
        LoadoutItem.existingForm(e.target.dataset.loadoutId)
        break
      case ('remove-form'):
        LoadoutItemAdapter.removeLoadoutItemForm(e)
        break
    }
  }

  static editNameRow(id) {
    const loadout = Loadout.findById(id)
    const div = document.querySelector(`#user-game-loadout-div-${id}`)
    div.innerHTML = ""
    div.append(loadout.editLoadoutNameForm())
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