/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.lastword = null;
    this.wordstate = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let state = this.wordstate;
    let splitwords = this.words;
    for (let i=0; i<splitwords.length; i++) {
      if (state[splitwords[i]]) {
        if (splitwords[i+1]) {
          state[splitwords[i]].push(splitwords[i+1]);
        } else {
          state[splitwords[i]].push(null);
        }  
      } else {
        if (splitwords[i+1]) {
          state[splitwords[i]] = [splitwords[i+1]];
        } else {
          this.lastword = splitwords[i];
          state[splitwords[i]] = [null];
        }
      }
    }
  }

  /**
   * Pick random number
   */

  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let state = this.wordstate;
    let splitwords = this.words;
    let text = [];
    let currentWord = MarkovMachine.choice(splitwords);
    text.push(currentWord);

    for (let i=0; i< numWords; i++) {
      let nextWord = MarkovMachine.choice(state[currentWord]);
      if (nextWord) {
        currentWord = nextWord;
        text.push(currentWord);
      } else {
        break;
      }
    }
    return text.join(" ");
  }
  
}

module.exports = MarkovMachine;