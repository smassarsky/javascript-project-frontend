class LoadoutItemTemplates {

  static formCounter = 0

  static newForm = (e) => {
    const noItemHolder = document.querySelector('#no-item-holder')
    if (noItemHolder) {
      noItemHolder.remove()
    }
    const newLoadoutItemForm = document.createElement('form')
   newLoadoutItemForm.id = `new-loadout-item-form-${this.formCounter}`
   newLoadoutItemForm.dataset.id = `${e.target.dataset.id}`
   newLoadoutItemForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="new-loadout-item-name-${this.formCounter}" class="visually-hidden">New Loadout Item Name</label>
            <input id="new-loadout-item-name-${this.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-2">
            <label for="new-loadout-item-quantity-${this.formCounter}" class="visually-hidden">New Loadout Item Quantity</label>
            <input id="new-loadout-item-quantity-${this.formCounter}" class="form-control" type="number" name="quantity" placeholder="0" min="0">
          </td>
          <td class="col-4">
            <label for="new-loadout-item-note-${this.formCounter}" class="visually-hidden">New Loadout Item Note</label>
            <input id="new-loadout-item-note-${this.formCounter}" class="form-control" type="text" name="note" placeholder="Note">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Add to Loadout</button>
            <button id="remove-form-${this.formCounter}" data-counter="${this.formCounter}" type="button" class="btn btn-sm btn-primary">Remove</button>
          </td>
      </table>
    `
    document.querySelector('#loadout-item-table-headers').after(newLoadoutItemForm)
    document.querySelector(`#new-loadout-item-form-${this.formCounter}`).addEventListener('submit', LoadoutItemAdapter.createNewLoadoutItem)
    document.querySelector(`#remove-form-${this.formCounter}`).addEventListener('click', LoadoutItemAdapter.removeLoadoutItemForm)


    this.formCounter++
  }

  static editForm = (loadoutItem) => {
    const newEditForm = document.createElement('form')
    newEditForm.id = `edit-loadout-item-form-${loadoutItem.id}`
    newEditForm.dataset.id = `${loadoutItem.id}`
    newEditForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="edit-loadout-item-name-${loadoutItem.id}" class="visually-hidden">Edit Loadout Item Name</label>
            <input id="edit-loadout-item-name-${loadoutItem.id}" class="form-control" type="text" name="name" placeholder="Name" value="${loadoutItem.name}">
          </td>
          <td class="col-2">
            <label for="edit-loadout-item-quantity-${loadoutItem.id}" class="visually-hidden">Edit Loadout Item Name</label>
            <input id="edit-loadout-item-quantity-${loadoutItem.id}" class="form-control" type="number" name="quantity" placeholder="0" min="0" value="${loadoutItem.quantity}">
          </td>
          <td class="col-4">
            <label for="edit-loadout-item-note-${loadoutItem.id}" class="visually-hidden">Edit Loadout Item Note</label>
            <input id="edit-loadout-item-note-${loadoutItem.id}" class="form-control" type="text" name="note" placeholder="Note" value="${loadoutItem.note}">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Edit Loadout Item</button>
            <button id="remove-edit-form-${loadoutItem.id}" data-id="${loadoutItem.id}" type="button" class="btn btn-sm btn-primary">Cancel</button>
          </td>
        </tr>
      </table>
    `
    newEditForm.addEventListener('submit', LoadoutItemAdapter.editLoadoutItem)
    newEditForm.querySelector(`#remove-edit-form-${loadoutItem.id}`).addEventListener('click', LoadoutItemAdapter.removeEditRow)
    return newEditForm
  }

}