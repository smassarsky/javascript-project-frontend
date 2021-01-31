class GameTemplates {
  
  static indexHtml = () => {
    return `
      <div class="text-center my-3">
        <h2>All Games</h2>
        <p><i>Please pick a game:</i></p>
        <div class="row justify-content-center">
          <div class="col-sm-9 col-md-6 col-lg-3">
            <input list="games-datalist" name="game-options" id="game-options" class="form-control">
          </div>
        </div>
        <datalist id="games-datalist">
          <option value=""></option>
        </datalist>
      </div>
      <div id="show-game-div" class="justify-content-center">
      </div>
    `
  } 

  static gameDivHtml(game) {
    const publishers = game.publishers.map(company => `<p>${company.name}</p>`).join('')
    const developers = game.developers.map(company => `<p>${company.name}</p>`).join('')

    return `
      <div class="card m-auto" style="max-width: 540px">
        <div class="row">
          <div class="col-md-4">
            <img src="${game.coverUrl}" class="card-img" alt="${game.name} Cover">
          </div>
          <div class="col-md-8">
            <div class="card-body text-center">
              <h5 class="card-title">${game.name}</h5>
              <h6>Published by:</h6>
              ${publishers || "<p>No publishers on record.</p>"}
              <h6>Developed by:</h6>
              ${developers || "<p>No developers on record.</p>"}
              <button class="btn btn-primary" id="add-to-collection-button" data-id="${game.id}">Add to collection</button>
              <div id="add-game-error-div"></div>
            </div>
          </div>
        </div>
      </div>
    `
  }

}
