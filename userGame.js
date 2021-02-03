class UserGame {

  static all = []

  static findById = (id) => this.all.find(userGame => userGame.id === id)


  constructor({id, game: { name, cover_url }, tasks = [], loadouts = []}) {
    const checkFirst = UserGame.all.find(userGame => userGame.id === id)
    if (!checkFirst) {
      this.id = id
      this.name = name
      this.coverUrl = cover_url
      this.tasks = tasks
      this.loadouts = loadouts
      this.fetchedAllItems = false
      this.items = []

      this.gameCard = this.renderCard()

      UserGame.all.push(this)
      return this
    } else {
      checkFirst.update({tasks: tasks, loadouts: loadouts})
      return checkFirst
    }
  }


  // lookup methods for related objects
  findLoadoutById = (id) => this.loadouts.find(loadout => loadout.id === id)
  findLoadoutIndexById = (id) => this.loadouts.indexOf(loadout => loadout.id === id)
  findItemById = (id) => this.items.find(item => item.id === id)
  findItemIndexById = (id) => this.items.indexOf(item => item.id === id)


  update({tasks, loadouts}) {
    if (tasks.length > 0){
      this.tasks = []
      tasks.forEach(task => this.tasks.push(new Task(task)))
    }
    if (loadouts.length > 0) {
      loadouts.forEach(loadout => this.addLoadout(loadout))
    }
  }

  // add / remove methods for related objects
  addLoadout = (loadoutJson) => {
    const checkFirst = this.findLoadoutById(loadoutJson.id)
    if (!checkFirst) {
      this.loadouts.push(new Loadout(Object.assign(loadoutJson, {userGame: this})))
      return this.loadouts[this.loadouts.length - 1]
    } else {
      checkFirst.update(loadoutJson)
      return checkFirst
    }
  }

  removeLoadout = (loadout) => {
    this.loadouts.splice(this.findLoadoutIndexById(loadout.id), 1)
  }

  addItem = (itemJson) => {
    const checkFirst = this.findItemById(itemJson.id)
    if (!checkFirst) {
      this.items.push(new Item(Object.assign(itemJson, { userGame: this })))
      return this.items[this.items.length - 1]
    } else {
      checkFirst.update(itemJson)
      return checkFirst
    }
  }

  removeItem = (item) => {
    this.items.splice(this.findItemIndexById(item.id), 1)
  }

  renderLoadoutTable = () => {

    return `
      <div class="text-center">
        <h3>Loadouts</h3>
        <button id="new-loadout-button" data-user-game-id="${this.id}" class="btn btn-primary">New Loadout</button>
        <div id="loadout-success-div" class="text-success"></div>
        <div id="loadout-error-div" class="text-danger"></div>
      </div>
      <div id="loadout-table-container" class="table-responsive">
        <table id="loadout-table-headers" class="table text-center mb-0">
          <thead>
            <tr>
              <th class="col-6">Name</th>
              <th class="col-6">Actions</th>
            </tr>
          </thead>
        </table>

        <table class="table text-center"><tbody id="loadout-table-body"></tbody></table>

      </div>
    `
  }

  renderLoadoutTableData = () => {
    const tbody = document.createElement('tbody')
    if (this.loadouts.length > 0) {
      this.loadouts.forEach(loadout => tbody.appendChild(loadout.renderTableRow('Show', 'Edit Name', 'Delete')))
    } else {
      tbody.innerHTML = LoadoutTemplates.noLoadoutHolderHtml()
    }
    return tbody
  }

  renderTasksTable() {
    return `
      <div class="text-center">
        <h3>Tasks</h3>
        <button id="new-task-button" data-user-game-id="${this.id}" class="btn btn-primary">New Task</button>
      </div>
      <table class="table text-center">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          ${(this.tasks.length > 0) ? this.tasks.map(task => task.tableRow()).join("") : "<tr id='no-task-holder'><td>No Tasks created yet</td></tr>"}
        </tbody>
      </table>
    `
  }

  renderCard() {
    const newCard = document.createElement('div')
    newCard.className = 'col'
    newCard.innerHTML = `
      <div class="card user-game-card" data-user-game-id="${this.id}">
        <img src="${this.coverUrl}" class="card-img-top" alt="${this.name} Cover">
        <div class="card-body">
          <h5 class="card-title text-center">${this.name}</h5>
        </div>
      </div>
    `
    return newCard
  }

}