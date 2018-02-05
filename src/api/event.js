const Evented = {
  Event: {
    on (event, callback, context) {
      this.hasOwnProperty('events') || (this.events = {})
      this.events.hasOwnProperty(event) || (this.events[event] = [])
      this.events[event].push([callback, context])
    },
    trigger (event) {
      const tail = Array.prototype.slice.call(arguments, 1)
      const callbacks = this.events[event]
      for (let i = 0, l = callbacks.length; i < l; i++) {
        const callback = callbacks[i][0]
        const context = callbacks[i][1] === undefined ? this : callbacks[i][1]
        callback.apply(context, tail)
      }
    }
  },
  extend (other) {
    for (const property in this.Event) {
      other[property] = this.Event[property]
    }
    return other
  }
}

export {Evented}
