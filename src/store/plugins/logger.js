// Credits: borrowed code from fcomb/redux-logger
// import util from '../../common/util'

export default function createLogger ({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = state => state,
  mutationTransformer = mut => mut
} = {}) {
  let util = require('../../common/util');

  return store => {
    let prevState = util.deepCopy(store.state);

    store.subscribe((mutation, state) => {
      if (typeof console === 'undefined') {
        return;
      }
      const nextState = util.deepCopy(state);

      if (filter(mutation, prevState, nextState)) {
        const time = new Date();
        const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;
        const formattedMutation = mutationTransformer(mutation);
        const message = `mutation ${mutation.type}${formattedTime}`;
        const startMessage = collapsed ? console.groupCollapsed : console.group;

        // render
        try {
          startMessage.call(console, message);
        } catch (e) {
          log(message);
        }

        log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
        log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
        log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));

        try {
          console.groupEnd();
        } catch (e) {
          log('—— log end ——');
        }
      }

      prevState = nextState;
    });
  };
}

function log(obj) {
  console.log(obj);
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str);
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}
