class LoadoutTemplates {

  static userGameTableDivHtml = (loadout) => {
    return `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">${loadout.name}</td>
          <td class="col-6">
            <button data-loadout-id="${loadout.id}" class="btn btn-sm btn-primary me-3 show-button">Show</button>
            <button data-loadout-id="${loadout.id}" class="btn btn-sm btn-primary me-3 edit-button">Edit</button>
            <button data-loadout-id="${loadout.id}" class="btn btn-sm btn-primary delete-button">Delete</button>
          </td>
        </tr>
      </table>
    `
  }

  static newLoadoutFormHtml = (userGame) => {
    return `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">
            <label for="new-loadout-name-${userGame.id}-${userGame.formCounter}" class="visually-hidden">New Loadout Name</label>
            <input id="new-loadout-name-${userGame.id}-${userGame.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary me-3">Create Loadout</button>
            <button type="button" data-counter="${userGame.id}-${userGame.formCounter}" class="btn btn-sm btn-primary remove-button">Remove</button>
          </td>
        </tr>
      </table>
    `
  }

  static showPageButtonHtml = (loadout) => {
    return `
      <button data-loadout-id="${loadout.id}" class="btn btn-sm btn-primary me-3" data-target-class="loadout" data-button-type="new">New Loadout Item</button>
      <button data-loadout-id="${loadout.id}" class="btn btn-sm btn-primary" data-target-class="loadout" data-button-type="existing">Add Existing Loadout Item</button>
    `
  }

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

  static loadoutItemThead = () => {
    return `
      <thead>
        <tr>
          <th class="col-3">Name</th>
          <th class="col-2">Quantity</th>
          <th class="col-4">Note</th>
          <th class="col-3">Actions</th>
        </tr>
      </thead>
    `
  }

  static editNameFormHtml = (loadout) => {
    return `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">
            <label for="edit-loadout-name-${loadout.id}" class="visually-hidden">Edit Loadout Name</label>
            <input id="edit-loadout-name-${loadout.id}" class="form-control" type="text" name="name" value="${loadout.name}" placeholder="Name">
          </td>
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary me-3">Edit Name</button>
            <button type="button" class="btn btn-sm btn-primary cancel-edit-button" data-loadout-id="${loadout.id}">Cancel</button>
          </td>
        </tr>
      </table>
    `
  }

  static noLoadoutItemHtml = () => {
    return `<table class="table text-center mb-0"<tbody><tr><td>No Loadout Items Created Yet</td></tr></tbody></table>`
  }

}