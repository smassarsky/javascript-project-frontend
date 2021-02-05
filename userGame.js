class UserGame {

  static all = []

  static findById = (id) => this.all.find(userGame => userGame.id === parseInt(id))

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
      this.formCounter = 0

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
    this.renderShowPage()
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

  renderShowPage = () => {
    this.userGameShowContainer = document.createElement('div')

    this.cardContainer = this.renderCardContainer()
    this.infoContainer = this.renderInfoContainer()

    this.tasksDiv = this.renderTasksDiv()
    this.loadoutsDiv = this.renderLoadoutsDiv()

    this.loadoutsHeaderDiv = this.renderLoadoutsHeaderDiv()
    this.loadoutsTableContainer = this.renderLoadoutsTableContainer()

    this.userGameShowContainer.append(this.cardContainer, this.infoContainer)
    this.infoContainer.append(this.tasksDiv, this.loadoutsDiv)
    this.loadoutsDiv.append(this.loadoutsHeaderDiv, this.loadoutsTableContainer)
    this.renderLoadoutTableData()
  }

  renderCardContainer = () => {
    const cardContainer = document.createElement('div')
    cardContainer.id = `card-container-${this.id}`
    cardContainer.classList.add('row', 'row-cols-2', 'row-cols-md-4', 'row-cols-lg-6', 'g-4', 'justify-content-center', 'my-3')
    cardContainer.append(this.gameCard)
    return cardContainer
  }

  renderInfoContainer = () => {
    const infoContainer = document.createElement('div')
    infoContainer.id = `user-game-info-container-${this.id}`
    infoContainer.classList.add('row')
    return infoContainer
  }

  renderTasksDiv = () => {
    const tasksDiv = document.createElement('div')
    tasksDiv.id = `tasks-div-${this.id}`
    tasksDiv.classList.add('col', 'justify-content-center')
    return tasksDiv
  }

  renderLoadoutsDiv = () => {
    const loadoutsDiv = document.createElement('div')
    loadoutsDiv.id = `loadouts-div-${this.id}`
    loadoutsDiv.classList.add('col', 'justify-content-center')
    loadoutsDiv.addEventListener('click', LoadoutAdapter.loadoutTableSwitcher)
    return loadoutsDiv
  }

  renderLoadoutsHeaderDiv = () => {
    const loadoutsHeaderDiv = document.createElement('div')
    loadoutsHeaderDiv.classList.add('text-center')

    const h3 = document.createElement('h3')
    h3.innerText = "Loadouts"

    const newLoadoutButton = document.createElement('button')
    newLoadoutButton.innerText = "New Loadout"
    newLoadoutButton.classList.add('btn', 'btn-primary', 'new-loadout-button')
    newLoadoutButton.dataset.userGameId = this.id

    const successDiv = document.createElement('div')
    successDiv.classList.add('text-success')
    this.successDiv = successDiv

    const failureDiv = document.createElement('div')
    failureDiv.classList.add('text-danger')
    this.failureDiv = failureDiv

    loadoutsHeaderDiv.append(h3, newLoadoutButton, successDiv, failureDiv)

    this.noLoadoutsHolder = this.renderNoLoadoutHolder()

    return loadoutsHeaderDiv
  }

  renderLoadoutsTableContainer = () => {
    const loadoutsTableContainer = document.createElement('div')
    loadoutsTableContainer.classList.add('table-responsive', 'mb-3')

    const loadoutTh = document.createElement('table')
    loadoutTh.classList.add('table', 'text-center', 'mb-0')
    loadoutTh.innerHTML = `
      <thead>
        <tr>
          <th class="col-6">Name</th>
          <th class="col-6">Actions</th>
        </tr>
      </thead>
    `

    const loadoutTableBody = document.createElement('div')
    this.loadoutTableBody = loadoutTableBody

    loadoutsTableContainer.append(loadoutTh, loadoutTableBody)
    return loadoutsTableContainer
  }

  renderLoadoutTableData = () => {
    this.loadoutTableBody.innerHTML = ""
    if (this.loadouts.length > 0) {
      this.loadouts.forEach(loadout => this.loadoutTableBody.append(loadout.renderUserGameTableDiv()))
    } else {
      this.appendNoLoadoutHolder()
    }
  }

  appendNoLoadoutHolder = () => {
    this.loadoutsTableContainer.append(this.noLoadoutHolder)
  }

  removeNoLoadoutHolder = () => {
    this.noLoadoutHolder.remove()
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

  renderNoLoadoutHolder = () => {
    const noLoadoutHolder = document.createElement('table')
    noLoadoutHolder.classList.add('table', 'text-center', 'mb-0')
    noLoadoutHolder.innerHTML = "<tbody><tr><td>No Loadouts Created Yet</td></tr></tbody>"
    this.noLoadoutHolder = noLoadoutHolder
  }

  resetMessages = () => {
    this.successDiv.innerHTML = ""
    this.failureDiv.innerHTML = ""
  }

}