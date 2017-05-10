
const readline = require('readline');
const fs = require('fs');
let dataOne = [];
let country = 0;
let year = 0;
let value = 0;
let indicator = 0;

let lineCount = 0;

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

const rl = readline.createInterface({
  input: fs.createReadStream('../inputdata/Indicators.csv')
});

let result = [];
for(let i = 0; i < 55; i = i + 1)
{
result.push({ year: 1960 + i, Ruralvalue: 0, Urbanvalue: 0 });
}

rl.on('line', (data) => {
 // var cleanedLine =data.split(",");
//  console.log(cleanedLine);
	dataOne = data.split(',');
	if(lineCount === 0)
	{
		country = dataOne.indexOf('CountryName');
		year = dataOne.indexOf('Year');
		value = dataOne.indexOf('Value');
		indicator = dataOne.indexOf('IndicatorName');
		lineCount = lineCount + 1;
	}
	if(dataOne[country] === 'India')
	{
		if(dataOne[indicator] === 'Rural population (% of total population)')
			{
				result[dataOne[year] - 1960].Ruralvalue = dataOne[value];
			}
        if(dataOne[indicator] === 'Urban population (% of total)')
                {
					result[dataOne[year] - 1960].Urbanvalue = dataOne[value];
				}
	}
});
rl.on('close', () => {
// JSON.stringify(result, null, 1);
fs.writeFile('../outputdata/urbanVanithajson.json', JSON.stringify(result, null, 1));
});
return 'JSON written successfully';
};
