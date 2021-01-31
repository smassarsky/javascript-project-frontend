class UserGameAdapter {
  static baseURL = `${SessionAdapter.baseURL}/user_games`
  static container = document.querySelector('#content-container')

  static loadMyGamesPage = (e) => {
    if (e) {
      e.preventDefault()
    }
    this.fetchMyGames()
  }

  static fetchMyGames = () => {
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
          id: e.target.dataset.id
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
    fetch(`${this.baseURL}/${e.currentTarget.dataset.id}`, { credentials: 'include' })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.error("could not load page")
      }
    })
    .then(json => {
      if (json) {
        const userGame = new UserGame(json)
        this.container.innerHTML = UserGameTemplates.userGameShowHtml(userGame)
        const cardsContainer = document.querySelector('#cards-container').appendChild(userGame.gameCard)
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

}