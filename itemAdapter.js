class ItemAdapter {

  static baseURL = `${SessionAdapter.baseURL}/items`

  static createNewItem = (e) => {
    e.preventDefault()
    const loadout = Loadout.findById(e.target.dataset.id)
    fetch(ItemAdapter.baseURL, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        
      })
    })
  }

}