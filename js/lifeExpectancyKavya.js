
module.exports = function convert(startYear)
{
  if(typeof startYear === 'string')
  {
    return '';
  }

if(typeof startYear !== 'number' || isNaN(startYear))
  {
        throw new Error('Not a number');
  }


const readline = require('readline');
const fs = require('fs');


const rl = readline.createInterface({
  input: fs.createReadStream('/home/user/workspace/js_dev_boilerplate/inputdata/final.csv')
});
  let arr = [];
  let obj = {};

  rl.on('line', (line) => {
   let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  //  console.log(cleanedLine);


    if(cleanedLine[1] === 'KHM' || cleanedLine[1] === 'AGO' ||
       cleanedLine[1] === 'DEU' || cleanedLine[1] === 'MYS' || cleanedLine[1] === 'BTN')
    {
    if(cleanedLine[3] === 'SP.DYN.LE00.FE.IN')
    {
      obj['CountryName'] = cleanedLine[0];
      obj['Female'] = cleanedLine[5];
      obj['Year'] = cleanedLine[4];
    }
    if(cleanedLine[3] === 'SP.DYN.LE00.MA.IN')
  {
     obj['Male'] = cleanedLine[5];
     arr.push(obj);
  }
}
});
rl.on('close', () => {
  fs.writeFile('../outputdata/output.json', JSON.stringify(arr, null, 4));
 });
 return 'JSON written successfully';
};
