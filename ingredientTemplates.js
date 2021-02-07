class IngredientTemplates {

  static headerButtons = () => {
    return
  }

  static newForm = (item) => {
    return `
      <table class="table mb-0">
        <tr>
          <td class="col-3">
            <label for="new-ingredient-name-${item.id}-${item.formCounter}" class="visually-hidden">New Ingredient Name</label>
            <input id="new-ingredient-name-${item.id}-${item.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-2">
            <label for="new-ingredient-quantity-${item.id}-${item.formCounter}" class="visually-hidden">New Ingredient Quantity</label>
            <input id="new-ingredient-quantity-${item.id}-${item.formCounter}" class="form-control" type="number" name="quantity" placeholder="1" min="1">
          </td>
          <td class="col-4">
            <label for="new-ingredient-note-${item.id}-${item.formCounter}" class="visually-hidden">New Ingredient Note</label>
            <input id="new-ingredient-note-${item.id}-${item.formCounter}" class="form-control" type="text" name="note" placeholder="Note">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Create</button>
            <button data-counter="${item.id}-${item.formCounter}" type="button" class="btn btn-sm btn-primary" data-target-class="ingredient" data-button-type="remove-form">Remove</button>
          </td>
        </tr>
      </table>
    `
  }

  static existingForm = (item) => {
    return `
      <table class="table mb-0">
        <tr>
          <td class="col-3">
            <label for="existing-ingredient-name-${item.id}-${item.formCounter}" class="visually-hidden">Existing Ingredient Name</label>
            <input id="existing-ingredient-name-${item.id}-${item.formCounter}" class="form-control" type="text" name="name" placeholder="Name">
          </td>
          <td class="col-2">
            <label for="existing-ingredient-quantity-${item.id}-${item.formCounter}" class="visually-hidden">Existing Ingredient Quantity</label>
            <input id="existing-ingredient-quantity-${item.id}-${item.formCounter}" class="form-control" type="number" name="quantity" placeholder="1" min="1">
          </td>
          <td class="col-4">
            <label for="existing-ingredient-note-${item.id}-${item.formCounter}" class="visually-hidden">Existing Ingredient Note</label>
            <input id="existing-ingredient-note-${item.id}-${item.formCounter}" class="form-control" type="text" name="note" placeholder="Note">
          </td>
          <td class="col-3">
            <button type="submit" class="btn btn-sm btn-primary me-3">Create</button>
            <button data-counter="${item.id}-${item.formCounter}" type="button" class="btn btn-sm btn-primary" data-target-class="ingredient" data-button-type="remove-form">Remove</button>
          </td>
        </tr>
      </table>
    `
  }

  static tableData = (ingredient) => {
    return `
      <tr>
        <td class="col-3">${ingredient.name}</td>
        <td class="col-2">${ingredient.quantity}</td>
        <td class="col-4">${ingredient.note}</td>
        <td class="col-3">
          <button type="button" data-ingredient-id="${ingredient.id}" class="btn btn-sm btn-primary me-3" data-target-class="ingredient" data-button-type="edit">Edit</button>
          <button type="button" data-ingredient-id="${ingredient.id}" class="btn btn-sm btn-primary" data-target-class="ingredient" data-button-type="delete">Delete</button>
        </td>
      </tr>
    `
  }

}