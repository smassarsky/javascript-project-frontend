class LoadoutTemplates {

  static newLoadoutHtml = (userGame) => {
    return `
      <h4>New ${userGame.name} Loadout</h4>
      <div id="loadout-error-div" class="text-danger"></div>
      <form id="new-loadout-form" data-user-game-id="${userGame.id}">
        <label for="loadout-name" class="visually-hidden">Loadout Name</label>
        <input type="text" id="loadout-name" name="name" placeholder="name">
        <button type="submit" class="btn btn-primary">Create Loadout</button>
      </form>
    `
  }

  static noLoadoutHolderHtml = () => `<tr id="no-loadout-holder"><td>No loadouts created yet</td></tr>`

  static loadoutShowPageHtml = (loadout) => `
    <div id="loadout-header" class="text-center mt-3">
      <h2>${loadout.name} Loadout</h2>
      <div class="mb-3">
        <button id="new-loadout-item-button" data-loadout-id="${loadout.id}" class="btn btn-primary btn-sm me-3">New Loadout Item</button>
        <button id="add-existing-loadout-item-button" data-loadout-id="${loadout.id}" class="btn btn-primary btn-sm">Add Existing Loadout Item</button>
      </div>
      <div id="loadout-item-success-div" class="text-success"></div>
      <div id="loadout-item-error-div" class="text-danger"></div>
    </div>
    <div id="loadout-item-table-container" class="table-responsive">
      <table id="loadout-item-table-headers" class="table text-center mb-0">
        <thead>
          <tr>
            <th class="col-3">Name</th>
            <th class="col-2">Quantity</th>
            <th class="col-4">Note</th>
            <th class="col-3">Actions</th>
          </tr>
        </thead>
      </table>
      <div id="loadout-item-table-holder"></div>
    </div>
  `

  static loadLoadoutItemsTableHtml = (loadout) => {
    const tableHolder = document.querySelector('#loadout-item-table-holder')

    if (loadout.loadoutItems.length > 0) {
      loadout.loadoutItems.forEach(loadoutItem => tableHolder.appendChild(loadoutItem.tableDiv))
    } else {
      tableHolder.innerHTML = this.noLoadoutItemsHtml()
    }
  }

  static noLoadoutItemsHtml = () => `
    <table id="no-loadout-item-holder">
      <tbody><tr><td class="col-12">No Items Added to Loadout Yet</td></tr></tbody>
    </table>
  `

}