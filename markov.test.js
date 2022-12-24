const MarkovMachine = require('./markov');

test("constructor splits text into words and filters out empty strings", () => {
    const mm = new MarkovMachine("the cat in the hat");
    expect(mm.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });


  test("makeChains builds markov chains correctly", () => {
    const mm = new MarkovMachine("the cat in the hat");
    expect(mm.wordstate).toMatchObject({
      "the": ["cat", "hat"],
      "cat": ["in"],
      "in": ["the"],
      "hat": [null]
    });
  });
  
  test("choice selects random element from array", () => {
    const arr = ["a", "b", "c"];
    const choice = MarkovMachine.choice(arr);
    expect(arr).toContain(choice);
  });
  
  test("makeText generates random text from markov chains", () => {
    const mm = new MarkovMachine("the cat in the hat");
    const text = mm.makeText();
    expect(typeof text).toBe("string");
    expect(text.split(" ").length).toBeLessThanOrEqual(100);
  });
  