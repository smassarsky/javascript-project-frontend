class Loadout {

  static all = []

  static findById = (id) => Loadout.all.find(loadout => loadout.id === id)
  static findIndexById = (id) => Loadout.all.indexOf(loadout => loadout.id === id)

  constructor({id, name, items = []}) {
    const checkFirst = Loadout.findById(id)
      if (!checkFirst) {
      this.id = id
      this.name = name
      this.items = []

      items.forEach(item => this.items.push(new Item(item)))
      Loadout.all.push(this)
      return this
    } else {
      return checkFirst
    }
  }

  update = ({name, items=[]}) => {
    this.name = name
    items.forEach(item => this.items.push(new Item(item)))
  }

  destroy = () => {
    Loadout.all.splice(Loadout.findIndexById(this.id), 1)
  }

  static emptyLoadoutsRow = () => {
    return "<tr><td colspan='2'>No loadouts created yet</td></tr>"
  }

  renderTableRow(...options) {
    if (options.length === 0) {
      options = ["Show", "Edit Name", "Delete"]
    }
    const row = document.createElement('tr')
    row.id = `loadout-row-${this.id}`
    row.innerHTML = `<td class="col-6">${this.name}</td><td class="col-6">${this.optionButtons(options)}</td>`
    return row
  }

  optionButtons(options) {
    return options.map(option => `<button data-id="${this.id}" class="btn btn-sm btn-primary me-3 ${option.toLowerCase().split(" ").join("-")}-button">${option}</button>`).join('')
  }
  

  editLoadoutNameForm = () => {
    const newEditLoadoutNameForm = document.createElement('form')
    newEditLoadoutNameForm.dataset.id = this.id
    newEditLoadoutNameForm.innerHTML = 
    `
      <table class="table mb-0 text-center">
        <tr>
          <td class="col-6">
            <label for="edit-loadout-name-${this.id}" class="visually-hidden">Edit Loadout Name</label>
            <input id="edit-loadout-name-${this.id}" class="form-control" type="text" name="name" value="${this.name}" placeholder="Name">
          </td>
          <td class="col-6">
            <button type="submit" class="btn btn-sm btn-primary">Edit Name</button>
          </td>
        </tr>
      </table>
    `
    newEditLoadoutNameForm.addEventListener('submit', LoadoutAdapter.editLoadoutName)
    return newEditLoadoutNameForm
  }

}