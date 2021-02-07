class UserGameTemplates {

  static userGameCardHtml = (userGame) => {
    return `
    <div class="card user-game-card">
      <img src="${userGame.coverUrl}" class="card-img-top" alt="${userGame.name} Cover">
      <div class="card-body">
        <h5 class="card-title text-center">${userGame.name}</h5>
      </div>
    </div>
  `
  }

  static loadoutsHeaderAndOptionsHtml = (userGame) => {
    return `
      <h3>Loadouts</h3>
      <button data-user-game-id="${userGame.id}" class="btn btn-primary new-loadout-button">New Loadout</button>
    `
  }

  static loadoutsTheadHtml = (userGame) => {
    return `
      <table class="table text-center mb-0">
        <thead>
          <tr>
            <th class="col-6">Name</th>
            <th class="col-6">Actions</th>
          </tr>
        </thead>
      </table>
    `
  }
  
  static myGamesHeaderHtml = () => {
    return `
      <div class="my-3 text-center">
        <h2>My Games Collection</h2>
        <button id="add-game-button" class="btn btn-primary">Add Game</button>
      </div>
  `
  }
}