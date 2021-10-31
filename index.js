class State {
  #name
  #next
  #action
  #params
  constructor(name, action, params) {
    this.#name = name
    this.#action = action
    this.#params = params
  }
  setNext(next) {
    this.#next = next
  }
  getNext() {
    return this.#next
  }
  execute(params) {
    if (typeof this.#action === 'function') {
      this.#action(this.#params)
    }
  }
}

function noop() { }
function initStateChain(config) {
  let { states, initial } = config
  states = [...states]
  let header;
  const cacheMap = {}
  while (states.length) {
    const state = states.pop()
    if (!state.state || !state.next) throw new Error('state or next property needed')
    let current = cacheMap[state.state] || (cacheMap[state.state] = new State(state.state, state.action))
    const nextState = states.find(s => s.state === state.next)
    let next = cacheMap[state.next] || (state.next === undefined || nextState === undefined ? undefined : (cacheMap[state.next] = new State(state.next, nextState.action)))
    current.setNext(next)
    if (!header) header = current
  }
  if (initial) header = cacheMap[initial] || header
  for (const key in cacheMap) {
    cacheMap[key] = null
  }
  return header
}

function genChain(config = { states: [] }) {
  const chain = initStateChain(config)
  return function* () {
    let next = chain
    while (next) {
      next = yield next
    }
  }
}

function FSM(config) {
  const gen = genChain(config)
  const iter = gen()
  return {
    next() {
      this.state = iter.next(this.state).value
      this.state.execute()
      this.state = this.state.getNext()
      return this
    }
  }
}

const config = {
  states: [
    { state: 'green', next: 'red', action: () => { console.log('turn red') } },
    { state: 'red', next: 'yellow', action: () => { console.log('turn yellow') } },
    { state: 'yellow', next: 'green', action: () => { console.log('turn green') } },
  ],
  initial: 'green'
}