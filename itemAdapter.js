class ItemAdapter {

  static baseURL = `${SessionAdapter.baseURL}/items`

  static createNewItem = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(parseInt(e.target.dataset.id))
    fetch(ItemAdapter.baseURL, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        loadout_id: e.target.dataset.id,
        item: {
          name: e.target.name.value,
          quantity: parseInt(e.target.quantity.value),
          note: e.target.note.value
        }
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.error) {
        const newItem = new Item(json)
        loadout.items.push(newItem)
        e.target.remove()
        document.querySelector('#item-table-body').prepend(newItem.itemTableRow())
      } else {
        document.querySelector('#item-error-div').innerHTML = json.error
      }
    })
  }

}