class UserGameTemplates {

  static myGamesHtml = () => {
    return `
      <div class="my-3 text-center">
        <h2>My Games Collection</h2>
        <button id="add-game-button" class="btn btn-primary">Add Game</button>
      </div>
    ` + this.gameCardContainerHtml()
  }
  static gameCardContainerHtml = () => {
    return `
      <div id="cards-container" class="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4 justify-content-center my-3"></div>
    `
  }

  static userGameShowHtml = () => {
    return this.gameCardContainerHtml() + `
      <div id="user-game-info-container" class="row">
        <div id="tasks-div" class="col justify-content-center"></div>
        <div id="loadouts-div" class="col justify-content-center"></div>
      </div>
    `
  }

  static noLoadoutHolder = () => {
    return `
      <table><tbody><tr><td>No Loadouts Created Yet</td></tr></tbody></table>
    `
  }

}