module.exports = function convert(startYear)
{
  if(isNaN(startYear))
  {
       throw new Error('Not a number');
  }
  const readline = require('readline');
  const fs = require('fs');

  let data = [];
  let i = 0;
  let a = [];
  let cleanedLine;
  let ageGroup = 0;
  let literatePerson = 0;
  let js;
const rl = readline.createInterface({
// reading the final.csv file
input: fs.createReadStream('../inputdata/final.csv')
});
// reading line by line
rl.on('line', (line) => {
          if(i === 0)
          {
           // removing the junk files
           cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
           data = cleanedLine;
           ageGroup = data.indexOf('Age-group');
           literatePerson = data.indexOf('Literate - Persons');
           i = i + 1;
          }

          data = line.split(',');
          if(data[ageGroup] !== 'Age-group' && data[literatePerson] !== 'Literate - Persons')
          {
            a.push({agegroup: data[ageGroup], literateperson: data[literatePerson]});
          }
          js = JSON.stringify(a);
          fs.writeFile('../outputdata/indiaCensusPradheep.json', js);
      });
    return 'JSON written successfully';
};
