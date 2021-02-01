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
      <button id="new-item-button" data-id="${loadout.id}" class="btn btn-primary btn-sm me-3">New Item</button>
      <button id="add-existing-item-button" data-id="${loadout.id}" class="btn btn-primary btn-sm">Add Existing Item</button
      <div id="item-success-div" class="text-success"></div>
      <div id="item-error-div" class="text-danger"></div>
    </div>
    <div id="item-table-container" class="container table-responsive">
      <table id="item-table-headers" class="table text-center mb-0">
        <thead>
          <tr>
            <th class="col-3">Name</th>
            <th class="col-2">Quantity</th>
            <th class="col-4">Note</th>
            <th class="col-3">Actions</th>
          </tr>
        </thead>
      </table>
      <table class="table text-center"><tbody id="item-table-body"></tbody></table>
    </div>
  `

  static loadItemsTableHtml = (loadout) => {
    const tbody = document.querySelector('#item-table-body')

    console.log(loadout.items.length)
    if (loadout.items.length > 0) {
      loadout.items.forEach(item => tbody.appendChild(item.itemTableRow()))
    } else {
      tbody.innerHTML = `<tr id="no-item-holder"><td class="col-12">No Items Created Yet</td></tr>`
    }
  }

}