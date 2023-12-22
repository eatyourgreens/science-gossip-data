import fs from 'fs';

function allResults() {
  let results = [];
  fs.readdirSync('./site/_data/results').forEach(file => {
    const groupResults = JSON.parse(fs.readFileSync(`./site/_data/results/${file}`))
    console.log(file, groupResults.length)
    results = results.concat(groupResults)
  });
  console.log('Total number of results:', results.length)
  return results
}

export default allResults()
