
module.exports = class ShowReel {

  /*
   * Builds a showreel with the incoming array of tasks.
   * Each task is a function, with an optional `title` property
   * attached.
   */
  constructor (tasks = [], delay = 4000) {
    this._interval = null
    this._tasks = []
    this._delay = delay
    this._lastTick = 0
    this._taskIdx = 0 // Counter to keep track of what task is running

    this._el = document.createElement('ul')
    this._el.className = 'showreel-task-list'

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        window.clearInterval(this._interval)
      } else {
        setTimeout(this._createInterval.bind(this), 2000) // Give it a 2 second pause, then fire
      }
    }, false)

    // Add all the tasks we received
    tasks.forEach(task => this.add(task))
  }

  _clearActive () {
    let active = this._el.querySelector('li.active')
    if (active) {
      active.classList.remove('active')
    }
  }

  _tick () {
    let now = performance.now()
      , delta = now - this._lastTick

    if (delta > this._delay) {
      let next = this._tasks.shift()
      this._taskIdx++

      if (!next) {
        return this.clear()
      }

      next.call() // Fires the function
      this._clearActive()
      this._el.querySelector(`li:nth-child(${this._taskIdx})`).classList.add('active')
      this._lastTick = now
    }
  }

  _createInterval () {
    this._interval = window.setInterval(this._tick.bind(this), 50)
  }

  /*
   * Adds the incoming task to our list of all tasks.
   */
  add (task) {
    this._tasks.push(task.callback)
    let li = document.createElement('li')
    li.innerHTML = task.title
    this._el.append(li)
  }

  /*
   * Returns the DOM node containing the list of tasks
   */
  container () {
    return this._el
  }

  /*
   * Clears the showreel, stopping it and removing all the tasks
   */
  clear () {
    if (this._interval) {
      window.clearInterval(this._interval)
    }

    this._interval = null
    this._tasks.length = 0
    this._clearActive()
  }

  /*
   * Showtime!
   */
  start () {
    if (this._interval) {
      return
    }
    this._lastTick = (new Date()).setFullYear(1900)
    this._createInterval()
  }

}
