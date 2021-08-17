const Sequencer = require('@jest/test-sequencer').default;
class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    
    return copyTests.sort((testA, testB) => (
      testA.path.includes('_last_') && !testB.path.includes('_last_') ? 1 
      : !testA.path.includes('_last_') && testB.path.includes('_last_') ? -1 
      : 0
    ));
    
  }
}

module.exports = CustomSequencer;