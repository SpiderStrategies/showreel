# showreel

This is a javascript module to fire a array of functions over a delayed interval, but only when the browser is not hidden. It's useful if you don't feel like spending time learning
the browser peculiarities of setInterval/setTimeout/request animation frames when a browser tab is hidden or not in focus.

## User Guide

I learn best by examples:

```javascript
let tasks = [{
  title: 'Foo',
  callback: () => {
    console.log('Do something for foo')
  }
}, {
  title: 'Bar',
  callback: () => {
    console.log('Do something for bar')
  }
}]

let reel = new ShowReel(tasks)

reel.start() // Starts the show
```

The showreel contains a `container()` method which returns a DOM `ul` object containing the lists of all tasks. The currently running
task will have a `li.active` node.

The code is pretty simple. Poke around.

## License
This software is licensed under the [AGPL](https://www.gnu.org/licenses/agpl-3.0.en.html)

