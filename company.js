class Company {

  static all = []

  constructor({id, name}) {
    const searchFirst = Company.all.find(company => company.id === id)
    if (searchFirst === undefined) {
      this.id = id
      this.name = name
      Company.all.push(this)
    } else {
      return searchFirst
    }
  }
}