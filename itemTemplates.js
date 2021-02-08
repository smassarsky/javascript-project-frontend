class ItemTemplates {

  static formCounter = 0

  static addItemForm = (e) => {
    const noItemHolder = document.querySelector('#no-item-holder')
    if (noItemHolder) {
      noItemHolder.remove()
    }
    const newItemForm = document.createElement('form')
    newItemForm.id = `new-item-form-${this.formCounter}`
    newItemForm.dataset.loadoutId = `${e.target.dataset.loadoutId}`
    newItemForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="new-item-name-${this.formCounter}" class="visually-hidden">New Item Name</label>
            <input id="new-item-name-${this.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-2">
            <label for="new-item-quantity-${this.formCounter}" class="visually-hidden">New Item Quantity</label>
            <input id="new-item-quantity-${this.formCounter}" class="form-control" type="number" name="quantity" value="1" min="1">
          </td>
          <td class="col-4">
            <label for="new-item-note-${this.formCounter}" class="visually-hidden">New Item Note</label>
            <input id="new-item-note-${this.formCounter}" class="form-control" type="text" name="note" placeholder="Note">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Create Item</button>
            <button id="remove-form-${this.formCounter}" data-counter="${this.formCounter}" type="button" class="btn btn-sm btn-primary">Remove</button>
          </td>
      </table>
    `
    document.querySelector('#item-table-headers').after(newItemForm)
    document.querySelector(`#new-item-form-${this.formCounter}`).addEventListener('submit', ItemAdapter.createNewItem)
    document.querySelector(`#remove-form-${this.formCounter}`).addEventListener('click', ItemAdapter.removeItemForm)


    this.formCounter++
  }

  static editItemForm = (item) => {
    const newEditItemForm = document.createElement('form')
    newEditItemForm.id = `edit-item-form-${item.id}`
    newEditItemForm.dataset.itemId = `${item.id}`
    newEditItemForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-3">
            <label for="edit-item-name-${item.id}" class="visually-hidden">Edit Item Name</label>
            <input id="edit-item-name-${item.id}" class="form-control" type="text" name="name" placeholder="Name" value="${item.name}">
          </td>
          <td class="col-2">
            <label for="edit-item-quantity-${item.id}" class="visually-hidden">Edit Item Name</label>
            <input id="edit-item-quantity-${item.id}" class="form-control" type="number" name="quantity" min="1" value="${item.quantity}">
          </td>
          <td class="col-4">
            <label for="edit-item-note-${item.id}" class="visually-hidden">Edit Item Note</label>
            <input id="edit-item-not-${item.id}" class="form-control" type="text" name="note" placeholder="Note" value="${item.name}">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Edit Item</button>
            <button id="remove-edit-form-${item.id}" data-item-id="${item.id}" type="button" class="btn btn-sm btn-primary">Cancel</button>
          </td>
        </tr>
      </table>
    `
    newEditItemForm.addEventListener('submit', ItemAdapter.editItem)
    newEditItemForm.querySelector(`#remove-edit-form-${item.id}`).addEventListener('click', ItemAdapter.removeEditRow)
    return newEditItemForm
  }

  static tableHeaderAndOptions = (item) => {
    return `
    <h4>Ingredients</h4>
    <button type="button" id="add-new-ingredient-${item.id}" data-item-id="${item.id} "class="btn btn-sm btn-primary me-3" data-target-class="item" data-button-type="new-ingredient">Add New Ingredient</button>
    <button type="button" id="add-existing-ingredient-${item.id}" data-item-id="${item.id}" class="btn btn-sm btn-primary" data-target-class="item" data-button-type="existing-ingredient">Add Existing Ingredient</button>
  `
  }

  static ingredientTHead = () => {
    return `
      <thead>
        <tr>
          <td class="col-3">Name</td>
          <td class="col-2">Quantity</td>
          <td class="col-4">Note</td>
          <td class="col-3">Actions</td>
        </tr>
      </thead>
    `
  }

  static noIngredientsHtml = () => {
    return `
      <tbody><tr><td colspan="4">No Ingredients Added Yet</td></tr></tbody>
    `
  }

}