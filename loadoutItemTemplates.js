class LoadoutItemTemplates {

  static newFormHtml = (loadout) => {
    return `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="new-loadout-item-name-${loadout.id}-${loadout.formCounter}" class="visually-hidden">New Loadout Item Name</label>
            <input id="new-loadout-item-name-${loadout.id}-${loadout.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-2">
            <label for="new-loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="visually-hidden">New Loadout Item Quantity</label>
            <input id="new-loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="form-control" type="number" name="quantity" value="1" min="1">
          </td>
          <td class="col-4">
            <label for="new-loadout-item-note-${loadout.id}-${loadout.formCounter}" class="visually-hidden">New Loadout Item Note</label>
            <input id="new-loadout-item-note-${loadout.id}-${loadout.formCounter}" class="form-control" type="text" name="note" placeholder="Note">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Add to Loadout</button>
            <button id="remove-form-${loadout.id}-${loadout.formCounter}" data-counter="${loadout.id}-${loadout.formCounter}" type="button" class="btn btn-sm btn-primary" data-target-class="loadout-item" data-button-type="remove-form">Remove</button>
          </td>
        </tr>
      </table>
    `
  }

  static editFormHtml = (loadoutItem) => {
    return `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="edit-loadout-item-name-${loadoutItem.id}" class="visually-hidden">Edit Loadout Item Name</label>
            <input id="edit-loadout-item-name-${loadoutItem.id}" class="form-control" type="text" name="name" placeholder="Name" value="${loadoutItem.name}">
          </td>
          <td class="col-2">
            <label for="edit-loadout-item-quantity-${loadoutItem.id}" class="visually-hidden">Edit Loadout Item Quantity</label>
            <input id="edit-loadout-item-quantity-${loadoutItem.id}" class="form-control" type="number" name="quantity" min="1" value="${loadoutItem.quantity}">
          </td>
          <td class="col-4">
            <label for="edit-loadout-item-note-${loadoutItem.id}" class="visually-hidden">Edit Loadout Item Note</label>
            <input id="edit-loadout-item-note-${loadoutItem.id}" class="form-control" type="text" name="note" placeholder="Note" value="${loadoutItem.note}">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Edit Loadout Item</button>
            <button id="remove-edit-form-${loadoutItem.id}" data-loadout-item-id="${loadoutItem.id}" type="button" class="btn btn-sm btn-primary" data-target-class="loadout-item" data-button-type="cancel-edit">Cancel</button>
          </td>
        </tr>
      </table>
    `
  }

  static existingFormHtml = (loadout) => {
    return `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="existing-loadout-item-name-${loadout.id}-${loadout.formCounter}" class="visually-hidden">Existing Loadout Item Name</label>
            <select id="existing-item-name-${loadout.id}-${loadout.formCounter}" class="form-control" name="name" data-counter="${loadout.id}-${loadout.formCounter}"><option value=""></option></select>
          </td>
          <td class="col-2">
            <label for="loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="visually-hidden">Loadout Item Quantity</label>
            <input id="loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="form-control" type="number" name="quantity" value="1" min="1">
          </td>
          <td id="existing-item-note-${loadout.id}-${loadout.formCounter}" class="col-4">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Add to Loadout</button>
            <button id="remove-form-${loadout.id}-${loadout.formCounter}" data-counter="${loadout.id}-${loadout.formCounter}" type="button" class="btn btn-sm btn-primary" data-target-class="loadout-item" data-button-type="remove-form">Remove</button>
          </td>
        </tr>
      </table>
    `
  }

  static detailRowHtml = (loadoutItem) => {
    return `
      <tr>
        <td class="col-3">${loadoutItem.name}</td>
        <td class="col-2">${loadoutItem.quantity}</td>
        <td class="col-4">${loadoutItem.note}</td>
        <td class="col-3">${this.tableOptionButtons(loadoutItem)}</td>
      </tr>
    `
  }

  static tableOptionButtons = (loadoutItem) => {
    return `
      <button type="button" data-bs-toggle="collapse" data-bs-target="#item-ingredients-div-${loadoutItem.item.id}" data-loadout-item-id="${loadoutItem.id}" class="btn btn-sm btn-primary me-3" data-target-class="item" data-button-type="ingredient-toggle">Ingredients</button>
      <button type="button" data-loadout-item-id="${loadoutItem.id}" class="btn btn-sm btn-primary me-3" data-target-class="loadout-item" data-button-type="edit">Edit</button>
      <button type="button" data-loadout-item-id="${loadoutItem.id}" class="btn btn-sm btn-primary me-3" data-target-class="loadout-item" data-button-type="delete">Delete</button>
    `
  }

}