let log4js = require('log4js');
let logger = log4js.getLogger();
const readline = require('readline');
const fs = require('fs');
module.exports = function convert(startYear,param1,param2) {
if(typeof startYear === 'string')
{
    return '';
}
if(typeof startYear !== 'number' || isNaN(startYear))
{
throw new Error('Not a number');
}
const rl = readline.createInterface({
input: fs.createReadStream('../inputdata/crimedata.csv')
});
let jsonobj = [];
rl.on('line', (line) => {
   let lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
   let obj = {};
   obj.year = lin[17];
   let description = [param1, '$500 AND UNDER'];
   obj.overfive = 0;
   obj.underfive = 0;
   let flag = 0;
   if(description.indexOf(lin[6]) !== -1)
    {
    for (let i = 0; i < jsonobj.length; i = i + 1)
        {
        if(jsonobj[i].year === lin[17])
            {
            if(lin[6] === description[0])
                {
                     /*eslint-disable*/jsonobj[i].overfive = parseInt(jsonobj[i].overfive, 10) + 1;
                     flag = flag + 1;
                 }
                 else if(lin[6] === description[1]) 
                 {
                    /*eslint-disable*/jsonobj[i].underfive = parseInt(jsonobj[i].underfive, 10) + 1;        
                    flag = flag + 1;
                 }
             }
        }
        if(flag === 0)
        {
        if(lin[6] === description[0])
			{
			obj.overfive = 1;
			jsonobj.push(obj);
			}
			if(lin[6] === description[1])
			{
			obj.underfive = 1;
			jsonobj.push(obj);
			}
		}  	
    }
});

rl.on('close', function() {
	let jsobj = JSON.stringify(jsonobj);
    // console.log(jsobj);
    logger.debug(jsobj);
   fs.writeFile('../outputdata/OutputChicagoCrimeKavya.json', jsobj);
   logger.debug('close');
 });
 return 'JSON written successfully';
 };                                           