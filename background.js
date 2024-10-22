// This is a simplified English dictionary for demonstration purposes.
// In a real-world scenario, you'd want to use a more comprehensive dictionary.
const dictionary = [
  'cat', 'dog', 'bar', 'tar', 'fear', 'gear','bear', 'wear', 'tear', 'year', 'dear', 'hear', 'near', 'clear',  'act', 'fact', 'pact', 'tact', 'cart', 'dart', 'part', 'start',
  'and','fix','own','are','fly','odd','ape','fry','our','ace','for','pet','act','got','pat','ask','get','peg','arm','god','paw','age',
  'gel','pup','ago','gas','pit','air','hat','put','ate','hit','pot','all','has','pop','but','had','pin','bye','how','rat','bad','her',
  'rag','big','his','rub','bed','hen','row','bat','ink','rug','boy','ice','run','bus','ill','rap','bag','jab','ram','box','jug','sow',
  'bit','jet','see','bee','jam','saw','buy','jar','set','bun','job','sit','cub','jog','sir','kit','sat','car','key','sob','cut',
  'lot','tap','cow','lit','tip','cry','let','top','cab','lay','tug','can','mat','tow','dad','man','toe','dab','mad','tan','dam','mug',
  'ten','did','mix','two','dug','map','use','den','mum','van','dot','mud','vet','dip','mom','was','day','may','wet','ear','met','win',
  'eye','net','won','eat','new','wig','end','nap','war','elf','now','why','egg','nod','who','far','net','way','fat','not','wow','few',
  'nut','you','fan','oar','yes','fun','one','yak','fit','out','yet','fin','owl','zip','fox','old','zap',
  // Add more words as needed
];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateWords') {
    const words = generateWords(request.letters);
    sendResponse({ words: words });
  }
  return true;
});

function generateWords(letters) {
  const letterSet = new Set(letters.toLowerCase());
  return dictionary.filter(word => {
    const lowercaseWord = word.toLowerCase();
    if (lowercaseWord.length > letters.length) return false;
    for (const letter of lowercaseWord) {
      if (!letterSet.has(letter)) return false;
    }
    return true;
  });
}