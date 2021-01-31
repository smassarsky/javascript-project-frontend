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
          <td class="col-1">
            <label for="new-item-quantity-${this.formCounter}" class="visually-hidden">New Item Quantity</label>
            <input id="new-item-quantity-${this.formCounter}" class="form-control" type="number" name="quantity" placeholder="0">
          </td>
          <td class="
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary">Create Item</button>
          </td>
      </table>
    `
    document.querySelector('#item-table-headers').after(newItemForm)
    document.querySelector(`#new-item-form-${this.formCounter}`).addEventListener('submit', ItemAdapter.createNewItem)


    this.formCounter++
  }

}