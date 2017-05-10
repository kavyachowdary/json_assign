
const fs = require('fs');
module.exports = function convert(startYear)
{
let lineReader = require('readline').createInterface({
 input: fs.createReadStream('Indicators.csv')
});
let objarr = [];
lineReader.on('line', function (line) {
    let l = line;
    let linearr = l.split(',');
    if(linearr[1] === 'IND')
    {
        let obj = {};
        if(linearr[3] === 'SP.URB.TOTL.IN.ZS')
        {
        obj['country'] = linearr[0];
        obj['Urbanpop'] = linearr[5];
        obj['year'] = linearr[4];
        objarr.push(obj);
        }
        if(linearr[3] === 'SP.RUR.TOTL.ZS')
        {
        obj['country'] = linearr[0];
        obj['Rural_Pop'] = linearr[5];
        obj['year'] = linearr[4];
        objarr.push(obj);
        }
    }
});
if(isNaN(startYear))
 {
       throw new Error('Not a number');
 }
 let jsobj;
lineReader.on('close', function()
{
	let jsarr = [];
		for(let i = 0; i < objarr.length; i = i + 2)
		{
		if(objarr[i].year === objarr[i + 1].year)
			{
			objarr[i].Urbanpop = objarr[i + 1].Urbanpop;
			jsarr.push(objarr[i]);
			}
		}
		jsobj = JSON.stringify(jsarr);
		// console.log(jsobj);
        fs.writeFile('../outputdata/Outputfile.json', jsobj);
});

    return 'JSON written successfully';
};

