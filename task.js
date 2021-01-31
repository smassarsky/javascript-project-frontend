class Task {

  constructor({id, name, text, loadouts = []}) {
    this.id = id
    this.name = name
    this.text = text

    this.loadouts = []

    loadouts.forEach(loadout => this.loadouts.push(new Loadout(loadout)))
    return this
  }

  static tableRow() {
    return `<tr><td>${this.name}</td></tr>`
  }

}