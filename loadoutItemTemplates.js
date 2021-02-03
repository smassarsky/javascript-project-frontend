class LoadoutItemTemplates {

  static formCounter = 0

  static newForm = (e) => {
    const noLoadoutItemHolder = document.querySelector('#no-loadout-item-holder')
    if (noLoadoutItemHolder) {
      noLoadoutItemHolder.remove()
    }
    const newLoadoutItemForm = document.createElement('form')
   newLoadoutItemForm.id = `loadout-item-form-${this.formCounter}`
   newLoadoutItemForm.dataset.loadoutId = `${e.target.dataset.loadoutId}`
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
        </tr>
      </table>
    `
    document.querySelector('#loadout-item-table-headers').after(newLoadoutItemForm)
    document.querySelector(`#loadout-item-form-${this.formCounter}`).addEventListener('submit', LoadoutItemAdapter.addLoadoutItemNew)
    document.querySelector(`#remove-form-${this.formCounter}`).addEventListener('click', LoadoutItemAdapter.removeLoadoutItemForm)


    this.formCounter++
  }

  static editForm = (loadoutItem) => {
    const newEditForm = document.createElement('form')
    newEditForm.id = `edit-loadout-item-form-${loadoutItem.id}`
    newEditForm.dataset.loadoutId = `${loadoutItem.id}`
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
            <button id="remove-edit-form-${loadoutItem.id}" data-loadout-item-id="${loadoutItem.id}" type="button" class="btn btn-sm btn-primary">Cancel</button>
          </td>
        </tr>
      </table>
    `
    newEditForm.addEventListener('submit', LoadoutItemAdapter.editLoadoutItem)
    newEditForm.querySelector(`#remove-edit-form-${loadoutItem.id}`).addEventListener('click', LoadoutItemAdapter.removeEditRow)
    return newEditForm
  }

  static addExistingForm = (e) => {
    const noLoadoutItemHolder = document.querySelector('#no-loadout-item-holder')
    if (noLoadoutItemHolder) {
      noLoadoutItemHolder.remove()
    }
    const loadout = Loadout.findById(parseInt(e.target.dataset.loadoutId))
    const existingForm = document.createElement('form')
    existingForm.id = `loadout-item-form-${this.formCounter}`
    existingForm.counter = this.formCounter
    existingForm.dataset.loadoutId = loadout.id
    existingForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="existing-loadout-item-name-${this.formCounter}" class="visually-hidden">Existing Loadout Item Name</label>
            <select id="existing-item-name-${this.formCounter}" class="form-control" name="name" data-counter="${this.formCounter}"><option value=""></option></select>
          </td>
          <td class="col-2">
            <label for="loadout-item-quantity-${this.formCounter}" class="visually-hidden">Loadout Item Quantity</label>
            <input id="loadout-item-quantity-${this.formCounter}" class="form-control" type="number" name="quantity" placeholder="0" min="0">
          </td>
          <td id="existing-item-note-${this.formCounter}" class="col-4">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Add to Loadout</button>
            <button id="remove-form-${this.formCounter}" data-counter="${this.formCounter}" type="button" class="btn btn-sm btn-primary">Remove</button>
          </td>
        </tr>
      </table>
    `
    document.querySelector('#loadout-item-table-headers').after(existingForm)
    document.querySelector(`#loadout-item-form-${this.formCounter}`).addEventListener('submit', LoadoutItemAdapter.addLoadoutItemExisting)
    document.querySelector(`#remove-form-${this.formCounter}`).addEventListener('click', LoadoutItemAdapter.removeLoadoutItemForm)

    const dropDown = document.querySelector(`#existing-item-name-${this.formCounter}`)

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