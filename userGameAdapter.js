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
      this.appendUserGames()
      this.setIndexListeners()
    })
  }

  static appendUserGames() {
    this.container.innerHTML = UserGameTemplates.myGamesHtml()
    const cardsContainer = document.querySelector('#cards-container')
    UserGame.all.forEach(userGame => cardsContainer.appendChild(userGame.gameCard))
  }

  static setIndexListeners() {
    document.querySelector('#add-game-button').addEventListener('click', GameAdapter.loadAddGamePage)
    document.querySelectorAll('.user-game-card').forEach((card) => {
      card.addEventListener('click', this.loadShowUserGamePage)
    })
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
    const userGame = UserGame.findById(parseInt(e.currentTarget.dataset.userGameId))
    console.log(e.currentTarget, userGame)
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
        console.log(json)
        userGame.update(json)
        this.container.innerHTML = UserGameTemplates.userGameShowHtml(userGame)
        document.querySelector('#cards-container').appendChild(userGame.gameCard)
        document.querySelector('#tasks-div').innerHTML = userGame.renderTasksTable()
        document.querySelector('#loadouts-div').innerHTML = userGame.renderLoadoutTable()
        document.querySelector('#loadout-table-body').innerHTML = userGame.renderLoadoutTableData().innerHTML
        this.setShowPageListeners(userGame)
      }
    })
  }

  static setShowPageListeners = () => {
    document.querySelector('#new-task-button').addEventListener('click', TaskAdapter.newTaskPage)
    document.querySelector('#new-loadout-button').addEventListener('click', LoadoutAdapter.newLoadoutFormRow)
    document.querySelector('#loadout-table-body').addEventListener('click', LoadoutAdapter.loadoutTableSwitcher)
  }

  // static loadAllItems = (userGame) => {
  //   fetch(`${this.baseURL}/${}`)
  // }

}