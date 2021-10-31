# Generator版有限状态机
使用`FSM(config)` 函数创建生成状态机
```js
const config = {
  // 所有的状态
  states: [
    { 
      // 当前状态
      state: 'green', 
      // 下一个状态
      next: 'red', 
      // 状态切换后执行
      action: () => { console.log('turn red') } 
    },
    { state: 'red', next: 'yellow', action: () => { console.log('turn yellow') } },
    { state: 'yellow', next: 'green', action: () => { console.log('turn green') } },
  ],
  // 初始状态
  initial: 'green'
}
```
生成`fsm = FSM(config)`后，直接调用`fsm.next()` 状态机就会在初始状态开始切换，直到没有下一个状态时发生时停止