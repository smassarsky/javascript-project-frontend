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


      UserGame.all.push(this)
      return this
    } else {
      checkFirst.update({tasks: tasks, loadouts: loadouts})
      return checkFirst
    }
  }


  // lookup methods for related objects
  findLoadoutById = (id) => this.loadouts.find(loadout => loadout.id === id)
  findLoadoutIndexById = (id) => this.loadouts.findIndex(loadout => loadout.id === id)
  findItemById = (id) => this.items.find(item => item.id === id)
  findItemIndexById = (id) => this.items.findIndex(item => item.id === id)


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
    if (this.loadouts.length === 0) {
      this.noLoadoutsHolder.remove()
    }
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
    if (this.loadouts.length === 0) {
      this.loadoutsTableBody.append(this.noLoadoutsHolder)
    }
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

  loadShowPage = () => {
    SessionAdapter.clearHeaderDiv()
    SessionAdapter.clearCardContainer()
    SessionAdapter.cardContainer.append(this.gameCard)
    SessionAdapter.clearInfoContainer()
    SessionAdapter.infoContainer.classList.add('row')
    SessionAdapter.infoContainer.append(this.loadoutsDiv)
    //this.tasksDiv, 
  }

  get tasksDiv() {
    return this._tasksDiv = this._tasksDiv || this.renderTasksDiv()
  }

  renderTasksDiv = () => {
    const tasksDiv = document.createElement('div')
    tasksDiv.id = `tasks-div-${this.id}`
    tasksDiv.classList.add('col', 'justify-content-center')
    return tasksDiv
  }

  get loadoutsDiv() {
    return this._loadoutsDiv = this._loadoutsDiv || this.renderLoadoutsDiv()
  }

  renderLoadoutsDiv = () => {
    const loadoutsDiv = document.createElement('div')
    loadoutsDiv.id = `loadouts-div-${this.id}`
    loadoutsDiv.classList.add('col', 'justify-content-center')
    loadoutsDiv.addEventListener('click', LoadoutAdapter.loadoutTableSwitcher)
    loadoutsDiv.append(this.loadoutsHeaderDiv, this.loadoutsTableContainer)
    return loadoutsDiv
  }

  get loadoutsHeaderDiv() {
    return this._loadoutsHeadersDiv = this._loadoutsHeadersDiv || this.renderLoadoutsHeaderDiv()
  }

  renderLoadoutsHeaderDiv = () => {
    const loadoutsHeaderDiv = document.createElement('div')
    loadoutsHeaderDiv.classList.add('text-center')
    loadoutsHeaderDiv.append(this.loadoutsHeaderAndOptions, this.loadoutsSuccessDiv, this.loadoutsFailureDiv)
    return loadoutsHeaderDiv
  }

  get loadoutsHeaderAndOptions() {
    return this._loadoutsHeaderAndOptions = this._loadoutsHeaderAndOptions || this.renderLoadoutsHeaderAndOptions()
  }

  renderLoadoutsHeaderAndOptions = () => {
    const newDiv = document.createElement('div')
    newDiv.innerHTML = UserGameTemplates.loadoutsHeaderAndOptionsHtml(this)
    return newDiv
  }

  get loadoutsSuccessDiv() {
    return this._loadoutsSuccessDiv = this._loadoutsSuccessDiv || this.renderSuccessDiv()
  }

  get tasksSuccessDiv() {
    return this._tasksSuccessDiv = this._tasksSuccessDiv || this.renderSuccessDiv()
  }

  renderSuccessDiv = () => {
    const successDiv = document.createElement('div')
    successDiv.classList.add('text-success', 'success-div')
    return successDiv
  }

  get loadoutsFailureDiv() {
    return this._loadoutsFailureDiv = this._loadoutsFailureDiv || this.renderFailureDiv()
  }

  get tasksFailureDiv() {
    return this._tasksFailureDiv = this._tasksFailureDiv || this.renderFailureDiv()
  }

  renderFailureDiv = () => {
    const failureDiv = document.createElement('div')
    failureDiv.classList.add('text-danger', 'failure-div')
    return failureDiv
  }

  get loadoutsTableContainer() {
    return this._loadoutsTableContainer = this._loadoutsTableContainer || this.renderLoadoutsTableContainer()
  }

  renderLoadoutsTableContainer = () => {
    const loadoutsTableContainer = document.createElement('div')
    loadoutsTableContainer.classList.add('table-responsive', 'mb-3')
    loadoutsTableContainer.append(this.loadoutsTableHead, this.loadoutsTableBody)
    return loadoutsTableContainer
  }

  get loadoutsTableHead() {
    return this._loadoutsTableHead = this._loadoutsTableHead || this.renderLoadoutsTableHead()
  }

  renderLoadoutsTableHead = () => {
    const thead = document.createElement('div')
    thead.innerHTML = UserGameTemplates.loadoutsTheadHtml(this)
    return thead
  }

  get loadoutsTableBody() {
    return this._loadoutsTableBody = this._loadoutsTableBody || this.renderLoadoutsTableBody()
  }

  renderLoadoutsTableBody = () => {
    const loadoutsTableBody = document.createElement('div')
    if (this.loadouts.length > 0) {
      this.loadouts.forEach(loadout => loadoutsTableBody.append(loadout.userGameTableDiv))
    } else {
      loadoutsTableBody.append(this.noLoadoutsHolder)
    }
    return loadoutsTableBody
  }

  appendNoLoadoutsHolder = () => {
    this.loadoutsTableBody.append(this.noLoadoutsHolder)
  }

  removeNoLoadoutsHolder = () => {
    this.noLoadoutsHolder.remove()
  }

  get noLoadoutsHolder() {
    return this._noLoadoutsHolder = this._noLoadoutsHolder || this.renderNoLoadoutsHolder()
  }

  renderNoLoadoutsHolder = () => {
    const noLoadoutsHolder = document.createElement('table')
    noLoadoutsHolder.classList.add('table', 'text-center', 'mb-0')
    noLoadoutsHolder.innerHTML = "<tbody><tr><td>No Loadouts Created Yet</td></tr></tbody>"
    return noLoadoutsHolder
  }

  get gameCard() {
    return this._gameCard = this._gameCard || this.renderCard()
  }

  renderCard() {
    const newCard = document.createElement('div')
    newCard.className = 'col'
    newCard.dataset.userGameId = this.id
    newCard.innerHTML = UserGameTemplates.userGameCardHtml(this)
    newCard.addEventListener('click', UserGameAdapter.loadShowUserGamePage)
    return newCard
  }

  resetMessages = () => {
    this.loadoutSuccessDiv.innerHTML = ""
    this.loadoutFailureDiv.innerHTML = ""
    //this.taskSuccessDiv.innerHTML = ""
    //this.taskFailureDiv.innerHTML = ""
  }

}