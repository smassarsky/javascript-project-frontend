class LoadoutTemplates {

  static newLoadoutHtml = (userGame) => {
    return `
      <h4>New ${userGame.name} Loadout</h4>
      <div id="loadout-error-div" class="text-danger"></div>
      <form id="new-loadout-form" data-id="${userGame.id}">
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
        <button id="new-loadout-item-button" data-id="${loadout.id}" class="btn btn-primary btn-sm me-3">New Loadout Item</button>
        <button id="add-existing-loadout-item-button" data-id="${loadout.id}" class="btn btn-primary btn-sm">Add Existing Loadout Item</button>
      </div>
      <div id="loadout-item-success-div" class="text-success"></div>
      <div id="loadout-item-error-div" class="text-danger"></div>
    </div>
    <div id="loadout-item-table-container" class="container table-responsive">
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
      <table class="table text-center"><tbody id="loadout-item-table-body"></tbody></table>
    </div>
  `

  static loadLoadoutItemsTableHtml = (loadout) => {
    const tbody = document.querySelector('#loadout-item-table-body')

    console.log(loadout.loadoutItems.length)
    if (loadout.loadoutItems.length > 0) {
      loadout.loadoutItems.forEach(loadoutItem => tbody.appendChild(loadoutItem.tableRow()))
    } else {
      tbody.innerHTML = `<tr id="no-item-holder"><td class="col-12">No Items Created Yet</td></tr>`
    }
  }

}