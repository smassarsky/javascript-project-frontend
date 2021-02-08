class UserGameAdapter {
  static baseURL = `${SessionAdapter.baseURL}/user_games`
  static container = document.querySelector('#content-container')

  static loadMyGamesPage = (e) => {
    if (e) {
      e.preventDefault()
    }
    fetch(this.baseURL, { credentials: 'include' })
    .then(resp => resp.json())
    .then(userGamesJson => {
      userGamesJson.forEach(userGame => new UserGame(userGame))
      SessionAdapter.clearCardContainer()
      SessionAdapter.clearInfoContainer()
      this.appendUserGames()
      this.setIndexListeners()
    })
  }

  static appendUserGames() {
    SessionAdapter.headerDiv.innerHTML = UserGameTemplates.myGamesHeaderHtml()
    UserGame.all.forEach(userGame => SessionAdapter.cardContainer.appendChild(userGame.gameCard))
  }

  static setIndexListeners() {
    document.querySelector('#add-game-button').addEventListener('click', GameAdapter.loadAddGamePage)
  }

  static addToCollection = (e) => {
    const errorDiv = document.querySelector('#add-game-error-div')
    fetch(this.baseURL, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        game: {
          id: e.target.dataset.gameId
        }
      })
    })
    .then(resp => {
      if (resp.ok) {
        this.loadMyGamesPage()
      } else {
        errorDiv.innerHTML = resp.json().error
      }
    })
  }

  static loadShowUserGamePage = (e) => {
    const userGame = UserGame.findById(e.currentTarget.dataset.userGameId)
    fetch(`${this.baseURL}/${userGame.id}`, { credentials: 'include' })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.error("could not load page")
      }
    })
    .then(json => {
      if (json) {
        userGame.update(json)
        userGame.loadShowPage()
      }
    })
  }

  static setShowPageListeners = () => {
    document.querySelector('#new-task-button').addEventListener('click', TaskAdapter.newTaskPage)
    document.querySelector('#new-loadout-button').addEventListener('click', LoadoutAdapter.newLoadoutFormRow)
    document.querySelector('#loadout-table-body').addEventListener('click', LoadoutAdapter.loadoutTableSwitcher)
  }


}