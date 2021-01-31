class Game {

  static all = []

  static findById = (id) => {
    return this.all.find(game => game.id === id)
  }

  constructor({id, name, release_date, url, cover_url, genres, publishers, developers}) {
    this.id = id
    this.name = name
    this.releaseDate = release_date
    this.url = url
    this.coverUrl = cover_url
    this.genres = genres
    this.publishers = []
    this.developers = []

    Game.all.push(this)
  }

  update = ({release_date, url, cover_url, genres, publishers, developers}) => {
    this.releaseDate = release_date
    this.url = url
    this.coverUrl = cover_url
    this.genres = genres
    
    publishers.forEach(publisher => {
      if (!this.publishers.find(company => company.id === publisher.id)) {
        this.publishers.push(new Company(publisher))
      }
    })

    developers.forEach(developer => {
      if (!this.developers.find(company => company.id === developer.id)) {
        this.developers.push(new Company(developer))
      }
    })
  }

}