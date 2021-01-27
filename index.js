







function loadNavbar() {
  const nav = document.querySelector('#navbar')
  nav.classList = "navbar navbar-expand-lg navbar-light bg-light"
  nav.innerHTML = navbarHtml
}

const navbarHtml = `
  <div class="container-fluid">
    <a class="navbar-brand" id="home-link" href="#">Home</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse-target" aria-controls="navbar-collapse-target" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>


    <div class="collapse navbar-collapse" id="navbar-collapse-target">
      <div class="navbar-nav me-auto">
        <a id="games-link" class="nav-link" href="#">My Games</a>
      </div>
      <div class="navbar-nav px-3">
        <a id="logout-button" class="nav-link" href="#">Logout</a>
      </div>
    </div>
  </div>
`