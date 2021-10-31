# Finite State Machine using es6 generator
You can use `FSM(config)` generating a finite-state machine.And the config looks like as follows:
```js
const config = {
  // all states
  states: [
    { 
      // current state
      state: 'green', 
      // next state
      next: 'red', 
      // executed after the current state switchs to the next
      action: () => { console.log('turn red') } 
    },
    { state: 'red', next: 'yellow', action: () => { console.log('turn yellow') } },
    { state: 'yellow', next: 'green', action: () => { console.log('turn green') } },
  ],
  // initial state
  initial: 'green'
}
```
After executed `fsm = FSM(config)`, we can use `fsm.next()` to change state.