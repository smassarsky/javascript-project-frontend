class SessionAdapter {
  static baseURL = 'http://localhost:3000'
  static container = document.querySelector('#content-container')
  static headerDiv = document.querySelector('#header-div')
  static cardContainer = document.querySelector('#card-container')
  static infoContainer = document.querySelector('#info-container')
  static nav = document.querySelector('#navbar')

  static clearAll = () => {
    this.clearHeaderDiv()
    this.clearCardContainer()
    this.clearInfoContainer()
  }

  static clearHeaderDiv = () => {
    while (this.headerDiv.firstChild) {
      this.headerDiv.removeChild(this.headerDiv.firstChild)
    }
  }

  static clearCardContainer = () => {
    while (this.cardContainer.firstChild) {
      this.cardContainer.removeChild(this.cardContainer.firstChild)
    }
  }

  static clearInfoContainer = () => {
    while (this.infoContainer.firstChild) {
      this.infoContainer.removeChild(this.infoContainer.firstChild)
    }
  }

  static loadLandingPage = () => {
    this.nav.innerHTML = ""
    this.container.prepend(SessionTemplates.landingPageHtml())
    this.preloginStyling()
    this.setAuthLinkListeners()
  }
  
  static setAuthLinkListeners = () => {
    document.querySelector('#login-link').addEventListener('click', this.loadLoginPage)
    document.querySelector('#signup-link').addEventListener('click', this.loadSignupPage)
  }
  
  static loadLoginPage = (e) => {
    e.preventDefault()
    this.container.firstChild.remove() 
    this.container.prepend(SessionTemplates.loginHtml())
    document.querySelector('#login-form').addEventListener('submit', this.attemptLogin)
  }
  
  static loadSignupPage = (e) => {
    e.preventDefault()
    this.container.firstChild.remove()
    this.container.prepend(SessionTemplates.signupHtml())
    document.querySelector('#signup-form').addEventListener('submit', this.attemptSignup)
  }
  
  static attemptSignup = (e) => {
    e.preventDefault()
    const login_params = {'user': {'username': e.target.username.value, 
                                   'password': e.target.password.value, 
                                   'password_confirmation': e.target['password-confirmation'].value}}
    fetch(`${this.baseURL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(login_params)
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.error) {
        document.querySelector('#error-div').innerHTML = json.error
      } else {
        this.loadDashboard()
      }
    })
  }
  
  static attemptLogin = (e) => {
    e.preventDefault()
    let login_params = {'username': e.target.username.value, 'password': e.target.password.value}
    fetch(`${this.baseURL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(login_params)
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.error) {
        document.querySelector('#error-div').innerHTML = json.error
      } else {
        this.loadDashboard(e)
      }
    })
  }

  static loadDashboard = (e) => {
    this.loadNavbar()
    if (e.target.tagName === 'FORM') {
      e.target.remove()
    }
    this.clearAll()
    this.postLoginStyling()
    fetch(`${this.baseURL}/dashboard`, {credentials: 'include'})
    .then(resp => resp.json())
    .then(json => {
      console.log(json)
    })
  }

  static loadNavbar = () => {
    if (!this.nav.hasChildNodes()) {
      this.nav.classList = "navbar navbar-expand-lg navbar-light bg-light"
      this.nav.append(SessionTemplates.navbarHtml())
      document.querySelector('#dashboard-link').addEventListener('click', this.loadDashboard)
      document.querySelector('#games-link').addEventListener('click', UserGameAdapter.loadMyGamesPage)
      document.querySelector('#logout-button').addEventListener('click', this.logout)
    }
  }
  
  static preloginStyling = () => {
    document.querySelector('html').classList.add('h-100')
    document.querySelector('body').classList.add('h-100', 'body-login-styling')
  
  }
  
  static postLoginStyling = () => {
    document.querySelector('html').classList.remove('h-100')
    document.querySelector('body').classList.remove('h-100', 'body-login-styling')
  }

  static logout = () => {
    fetch(`${this.baseURL}/logout`, {
      method: 'DELETE', 
      credentials: 'include'
    })
    .then(this.loadLandingPage)
  }

}