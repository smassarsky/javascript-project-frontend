class SessionTemplates {
  static landingPageHtml = () => {
    const landingPageDiv = document.createElement('div')
    landingPageDiv.classList.add('m-auto', 'text-center')
    landingPageDiv.innerHTML = `
      <h2>Welcome to the Video Game Activity Planner</h2>
      <h3>Please <a id="login-link" href="#">Login</a> or <a id="signup-link" href="#">Signup</a></h3>
    `
    return landingPageDiv
  }
  
  static navbarHtml = () => {
    const navbarDiv = document.createElement('div')
    navbarDiv.classList.add('container-fluid')
    navbarDiv.innerHTML = `
      <a class="navbar-brand" id="dashboard-link" href="#">Dashboard</a>
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
    `
    return navbarDiv
  }
  
  static loginHtml = () => {
    const loginForm = document.createElement('form')
    loginForm.id = "login-form"
    loginForm.classList.add('form-signin', 'text-center')
    loginForm.innerHTML = `
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <div id="error-div" class="text-danger mb-3"></div>
    
      <div class="form-group mb-3">
        <label for="username" class="visually-hidden">Username</label>
        <input type="text" name="username" placeholder="Username" class="form-control">
      </div>
    
      <div class="form-group mb-3">
        <label for="password" class="visually-hidden">Password</label>
        <input type="text" name="password" placeholder="Password" class="form-control">
      </div>
    
      <button type="submit" class="btn btn-primary">Login</button>
    `
    return loginForm
  }
  
  static signupHtml = () => {
    const signupForm = document.createElement('form')
    signupForm.id = "signup-form"
    signupForm.classList.add('form-signin', 'text-center')
    signupForm.innerHTML = `
      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      <div id="error-div" class="text-danger mb-3"></div>

      <div class="form-group mb-3">
        <label for="username" class="visually-hidden">Username</label>
        <input type="text" name="username" placeholder="Username" class="form-control">
      </div>

      <div class="form-group mb-3">
        <label for="password" class="visually-hidden">Password</label>
        <input type="text" name="password" placeholder="Password" class="form-control">
      </div>

      <div class="form-group mb-3">
        <label for="password-confirmation" class="visually-hidden">Password Confirmation</label>
        <input type="text" name="password-confirmation" placeholder="Password Confirmation" class="form-control">
      </div>

      <button type="submit" class="btn btn-primary">Signup</button>
    `
    return signupForm
  } 

}