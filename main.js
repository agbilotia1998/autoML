let fs = require('fs');
let es = require('event-stream');
let lineNumber = 0;

let inputFile = 'smart_grid_data.csv';
let outputFile = 'preprocessed_data.csv';
let counter = 0;
let max_dimensions = 30;
let dataMap = new Map();
let dataLimit = 5000000*1000;

let writeData = function (dataMap) {
  let data = 'ID, ';

  for(let count = 1; count <= max_dimensions; count++) {
    data = data + 'LOAD' + count;
    if(count !== max_dimensions) {
      data += ', ';
    }
  }
  data += '\n';

  for(let [customerId, loadValues] of dataMap.entries()) {
    data = data + customerId + ', ';

    for(let count = 0; count < max_dimensions; count++) {
      if(count < loadValues.length) {
        data = data + loadValues[count];
      } else{
        data = data + '0';
      }

      if(count !== (max_dimensions - 1)) {
        data = data + ', ';
      }
    }

    data = data + '\n';
  }

  fs.writeFileSync(outputFile,data);
  process.exit();
};

let parser = function (line) {

    if(counter > 0) {
      let loadsList = [];

      if(dataMap.has(line[0])) {
        loadsList = dataMap.get(line[0]);

        if(loadsList.length < max_dimensions) {
          loadsList.push(line[4]);
        }
      } else {
        loadsList.push(line[4]);
      }

      dataMap.set(line[0], loadsList);
    }
    counter++;
};

let stream = fs.createReadStream(inputFile)
  .pipe(es.split())
  .pipe(es.mapSync(function(line){
      stream.pause();

      lineNumber += 1;
      let data = line.split(',');

      if(data.length > 1) {
        parser(data);
      }

      if(lineNumber > dataLimit) {
        console.log('data limit reached');
        stream.end();
      }

      stream.resume();
    })
      .on('error', function(err){
        console.log('Error while reading file.', err);
      })
      .on('end', function(){
        writeData(dataMap);
      })
  );