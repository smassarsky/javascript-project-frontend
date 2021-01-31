class UserGame {

  static all = []

  static findById = (id) => {
    return this.all.find(userGame => userGame.id === id)
  }

  constructor({id, game: { name, cover_url }, tasks = [], loadouts = []}) {
    const checkFirst = UserGame.all.find(userGame => userGame.id === id)
    if (!checkFirst) {
      this.id = id
      this.name = name
      this.coverUrl = cover_url
      this.tasks = tasks
      this.loadouts = loadouts

      this.gameCard = this.renderCard()

      UserGame.all.push(this)
      return this
    } else {
      checkFirst.updateTasksAndLoadouts({tasks: tasks, loadouts: loadouts})
      return checkFirst
    }
  }

  updateTasksAndLoadouts({tasks, loadouts}) {
    this.tasks = []
    this.loadouts = []
    if (tasks.length > 0){
      tasks.forEach(task => this.tasks.push(new Task(task)))
    }
    if (loadouts.length > 0) {
      loadouts.forEach(loadout => this.loadouts.push(new Loadout(loadout)))
    }
  }

  renderLoadoutTable = () => {

    return `
      <div class="text-center">
        <h3>Loadouts</h3>
        <button id="new-loadout-button" data-id="${this.id}" class="btn btn-primary">New Loadout</button>
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
        <button id="new-task-button" data-id="${this.id}" class="btn btn-primary">New Task</button>
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
      <div class="card user-game-card" data-id="${this.id}">
        <img src="${this.coverUrl}" class="card-img-top" alt="${this.name} Cover">
        <div class="card-body">
          <h5 class="card-title text-center">${this.name}</h5>
        </div>
      </div>
    `
    return newCard
  }

}