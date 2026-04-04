const fs = require('fs');
const f = 'C:/Users/Lenovo LOQ/Desktop/SerenDrive/SerenDrive/index.html';
let t = fs.readFileSync(f, 'utf8');

// Fix apostrophes inside single-quoted JS strings in the destinationData object
// These were originally smart quotes (U+2019) which were safe inside single quotes
// Our earlier fix turned them into plain ' which breaks the JS strings
// Replace 's with \u2019s only within the destinationData block
const start = t.indexOf('const destinationData');
const end = t.indexOf('};', t.indexOf('};', start) + 2) + 2; // end of the object

if (start !== -1 && end !== -1) {
  let block = t.substring(start, end);
  
  // Fix possessives inside single-quoted values: island's -> island\u2019s
  // Match patterns like: 'text with 's inside'
  block = block.replace(/(:\s*')([^']*?)('s)([^']*?)(')/g, function(match, p1, p2, p3, p4, p5) {
    return p1 + p2 + '\u2019s' + p4 + p5;
  });
  
  t = t.substring(0, start) + block + t.substring(end);
  console.log('Fixed apostrophes in destinationData block');
}

fs.writeFileSync(f, t, 'utf8');
console.log('Done');
