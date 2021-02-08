class GameAdapter {
  static baseURL = `${SessionAdapter.baseURL}/games`
  static container = document.querySelector('#content-container')

  static loadAddGamePage = (e) => {
    e.preventDefault()
    SessionAdapter.clearAll()
    this.fetchAllGames()
  }

  static fetchAllGames() {
    fetch(this.baseURL, { credentials: 'include' })
    .then(resp => resp.json())
    .then(json => {
      Game.all = []
      json.forEach(game => new Game(game))
      this.loadSkeleton()
      this.populateDatalist()
    })
  }

  static fetchOneGame(id) {
    return fetch(`${this.baseURL}/${id}`, { credentials: 'include' })
  }

  static loadSkeleton = () => {
    SessionAdapter.infoContainer.innerHTML = GameTemplates.indexHtml()
  }

  static populateDatalist = () => {
    const gameDataList = document.querySelector('#games-datalist')
    const gameListInput = document.querySelector('#game-options')
    gameDataList.innerHTML = ""
    Game.all.forEach((game) => {
      gameDataList.innerHTML += `<option value="${game.name}">`
    })
    gameListInput.addEventListener('change', this.loadGameShowPage)
  }

  static loadGameShowPage = (e) => {
    if (e.target.value != "") {
      const game = Game.all.find(testGame => testGame.name === e.target.value)
      if (game != undefined) {
        this.fetchOneGame(game.id)
        .then(resp => resp.json())
        .then(json => {
          game.update(json)
          document.querySelector('#show-game-div').innerHTML = GameTemplates.gameDivHtml(game)
          document.querySelector('#add-to-collection-button').addEventListener('click', UserGameAdapter.addToCollection)
        })
      }
    }
  }

}