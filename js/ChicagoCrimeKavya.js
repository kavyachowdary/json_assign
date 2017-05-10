
const readline = require('readline');
const fs = require('fs');
// test cases
module.exports = function convert(startYear) {
   if(typeof startYear === 'string') {
    return '';
   }
   if(typeof startYear !== 'number' || isNaN(startYear)) {
     throw new Error('Not a number');
    }
const rl = readline.createInterface({
input: fs.createReadStream('../inputdata/crimedata.csv')
});
// reading the csv file
let jsonobj = []; // object array
rl.on('line', (line) => {
let lin = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/); // clear junk data
   let obj = {};
   obj.year = lin[17];
	let description = ['OVER $500', '$500 AND UNDER'];
   obj.overfive = 0;
   obj.underfive = 0;
   let flag = 0;
    if(description.indexOf(lin[6]) !== -1) {
    for (let i = 0; i < jsonobj.length; i + 1) {
    if(jsonobj[i].year === lin[17]) {
    if(lin[6] === description[0]) {
                      /*eslint-disable*/ jsonobj[i].overfive = parseInt(jsonobj[i].overfive)+1;
                  flag + 1;

                 }
                 else if(lin[6] === description[1]) {
                  /*eslint-disable*/  jsonobj[i].underfive = parseInt(jsonobj[i].underfive)+1;        
                    flag + 1;            
                 }
             }
        }
        if(flag === 0) {
        jsonobj.push(obj);
        }      
    }
});

rl.on('close', function() {

   console.log(jsonobj);
   // writing the JSON after converting
   fs.writeFileSync('../outputdata/ChicagoCrimeKavya.json', JSON.stringify(jsonobj));
   

});return 'JSON written successfully';
 };