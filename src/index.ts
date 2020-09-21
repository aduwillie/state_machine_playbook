import { Machine, interpret } from 'xstate';

const promiseMachine = Machine({
  id: 'promiseMachine',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: 'fulfilled',
        REJECT: 'rejected',
      }
    },
    fulfilled: {
      type: 'final',
    },
    rejected: {
      type: 'final',
    },
  },
});

const promiseService = interpret(promiseMachine)
  .onTransition((state) => console.log(state.value))
  .start();

// promiseService.send('NEXT');
// promiseService.send('REJECT');

console.log('==================================================');

const trafficLightMachine = Machine({
  id: 'trafficLight',
  initial: 'red',
  states: {
    red: {
      on: {
        NEXT: 'green',
      },
    },
    yellow: {
      on: {
        NEXT: 'red',
      },
    },
    green: {
      on: {
        NEXT: 'yellow',
      },
    },
  }
});

const trafficLightService = interpret(trafficLightMachine)
  .onTransition(event => console.log(event.value))
  .start();

// setInterval(() => {
//   trafficLightService.send('NEXTS');
// }, 1000);

console.log('==================================================');

let time: number = 0;

const timerMachine = Machine(
  {
    id: "timer",
    initial: "inactive",
    states: {
      inactive: {
        on: {
          ACTIVATE: {
            target: 'active',
            actions: ['activate'],
          },
        },
      },
      active: {
        on: {
          TICK: {
            target: 'active',
            actions: ['tick'],
          },
          DEACTIVATE: {
            target: 'inactive',
            actions: ['deactivate'],
          },
        },
      },
    },
  },
  {
    actions: {
      activate: () =>{
        console.log('activating...');
        time = 0;
      },
      tick: () => {
        console.log('ticking...');
        time++;
        console.log('time', time);
      },
      deactivate: () => {
        console.log('deactivating...');
        time = 0;
      },
    },
  }
);

const timerService = interpret(timerMachine)
  .onTransition(event => console.log('transitioning...', event.value))
  .start();

timerService.send('ACTIVATE');
timerService.send('TICK');
timerService.send('TICK');
timerService.send('TICK');
timerService.send('TICK');
timerService.send('TICK');
timerService.send('DEACTIVATE');
