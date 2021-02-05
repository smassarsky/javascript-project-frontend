class LoadoutItemTemplates {

  static newForm = (loadoutId) => {
    const loadout = Loadout.findById(loadoutId)
    const newLoadoutItemForm = document.createElement('form')

    newLoadoutItemForm.id = `loadout-item-form-${loadout.id}-${loadout.formCounter}`
    newLoadoutItemForm.dataset.loadoutId = loadout.id
    newLoadoutItemForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="new-loadout-item-name-${loadout.id}-${loadout.formCounter}" class="visually-hidden">New Loadout Item Name</label>
            <input id="new-loadout-item-name-${loadout.id}-${loadout.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-2">
            <label for="new-loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="visually-hidden">New Loadout Item Quantity</label>
            <input id="new-loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="form-control" type="number" name="quantity" placeholder="0" min="0">
          </td>
          <td class="col-4">
            <label for="new-loadout-item-note-${loadout.id}-${loadout.formCounter}" class="visually-hidden">New Loadout Item Note</label>
            <input id="new-loadout-item-note-${loadout.id}-${loadout.formCounter}" class="form-control" type="text" name="note" placeholder="Note">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Add to Loadout</button>
            <button id="remove-form-${loadout.id}-${loadout.formCounter}" data-counter="${loadout.id}-${loadout.formCounter}" type="button" class="btn btn-sm btn-primary remove-form-button">Remove</button>
          </td>
        </tr>
      </table>
    `
    newLoadoutItemForm.addEventListener('submit', LoadoutItemAdapter.addLoadoutItemNew)
    loadout.loadoutItemTableHolder.prepend(newLoadoutItemForm)
    loadout.formCounter++
  }

  static editForm = (loadoutItem) => {
    const newEditForm = document.createElement('form')
    newEditForm.id = `edit-loadout-item-form-${loadoutItem.id}`
    newEditForm.dataset.loadoutItemId = `${loadoutItem.id}`
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
            <button id="remove-edit-form-${loadoutItem.id}" data-loadout-item-id="${loadoutItem.id}" type="button" class="btn btn-sm btn-primary cancel-edit-button">Cancel</button>
          </td>
        </tr>
      </table>
    `
    newEditForm.addEventListener('submit', LoadoutItemAdapter.editLoadoutItem)
    return newEditForm
  }

  static addExistingForm = (loadoutId) => {

    const loadout = Loadout.findById(loadoutId)
    const existingForm = document.createElement('form')
    existingForm.id = `loadout-item-form-${loadout.id}-${loadout.formCounter}`
    existingForm.counter = loadout.formCounter
    existingForm.dataset.loadoutId = loadout.id
    existingForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="existing-loadout-item-name-${loadout.id}-${loadout.formCounter}" class="visually-hidden">Existing Loadout Item Name</label>
            <select id="existing-item-name-${loadout.id}-${loadout.formCounter}" class="form-control" name="name" data-counter="${loadout.id}-${loadout.formCounter}"><option value=""></option></select>
          </td>
          <td class="col-2">
            <label for="loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="visually-hidden">Loadout Item Quantity</label>
            <input id="loadout-item-quantity-${loadout.id}-${loadout.formCounter}" class="form-control" type="number" name="quantity" placeholder="0" min="0">
          </td>
          <td id="existing-item-note-${loadout.id}-${loadout.formCounter}" class="col-4">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Add to Loadout</button>
            <button id="remove-form-${loadout.id}-${loadout.formCounter}" data-counter="${loadout.id}-${loadout.formCounter}" type="button" class="btn btn-sm btn-primary remove-form-button">Remove</button>
          </td>
        </tr>
      </table>
    `
    existingForm.addEventListener('submit', LoadoutItemAdapter.addLoadoutItemExisting)
    loadout.loadoutItemTableHolder.prepend(existingForm)

    const dropDown = document.querySelector(`#existing-item-name-${loadout.id}-${loadout.formCounter}`)

    ItemAdapter.fetchUserGameItemsTruncated(loadout.userGame)
    .then(() => {
      loadout.userGame.items.forEach(item => dropDown.appendChild(item.optionElement()))
      dropDown.addEventListener('change', (e) => {
        console.log(e)
        const item = Item.findById(parseInt(e.target.value))
        document.querySelector(`#existing-item-note-${e.target.dataset.counter}`).innerHTML = item.note
      })
    })
    this.formCounter++
  }

}