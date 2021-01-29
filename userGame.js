class UserGame {

  static all = []

  constructor({id, game: { name, cover_url }, tasks = [], loadouts = []}) {
    const checkFirst = UserGame.all.find(userGame => userGame.id === id)
    if (!checkFirst) {
      console.log("hi")
      this.id = id
      this.name = name
      this.coverUrl = cover_url
      this.tasks = tasks
      this.loadouts = loadouts

      this.gameCard = this.renderCard()

      UserGame.all.push(this)
      return this
    } else {
      return checkFirst
    }
  }

  renderCard() {
    const newCard = document.createElement('div')
    newCard.className = 'col'
    newCard.innerHTML = `
      <div class="card user-game-card" data-id="${this.id}">
        <img src="${this.coverUrl}" class="card-img-top" alt="${this.name} Cover">
        <div class="card-body">
          <h5 class="card-title text-center">${this.name}</h5>
        </div>
      </div>
    `
    return newCard
  }

}