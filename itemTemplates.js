class ItemTemplates {

  static formCounter = 0

  static addItemForm = (e) => {
    const noItemHolder = document.querySelector('#no-item-holder')
    if (noItemHolder) {
      noItemHolder.remove()
    }
    const newItemForm = document.createElement('form')
    newItemForm.id = `new-item-form-${this.formCounter}`
    newItemForm.dataset.id = `${e.target.dataset.id}`
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
            <input id="new-item-quantity-${this.formCounter}" class="form-control" type="number" name="quantity" placeholder="0" min="0">
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
    newEditItemForm.dataset.id = `${item.id}`
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
            <input id="edit-item-quantity-${item.id}" class="form-control" type="number" name="quantity" placeholder="0" min="0" value="${item.quantity}">
          </td>
          <td class="col-4">
            <label for="edit-item-note-${item.id}" class="visually-hidden">Edit Item Note</label>
            <input id="edit-item-not-${item.id}" class="form-control" type="text" name="note" placeholder="Note" value="${item.name}">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Edit Item</button>
            <button id="remove-edit-form-${item.id}" data-id="${item.id}" type="button" class="btn btn-sm btn-primary">Cancel</button>
          </td>
        </tr>
      </table>
    `
    newEditItemForm.addEventListener('submit', ItemAdapter.editItem)
    newEditItemForm.querySelector(`#remove-edit-form-${item.id}`).addEventListener('click', ItemAdapter.removeEditRow)
    return newEditItemForm
  }

}