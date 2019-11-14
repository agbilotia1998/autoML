let fs = require('fs');
let parse = require('csv-parse');
let async = require('async');

let inputFile = 'CD_INTERVAL_READING_ALL_NO_QUOTES.csv';
let outputFile = 'preprocessed_data.csv';
let counter = 0;
let max_dimensions = 30;
let dataMap = new Map();

let writeData = function (dataMap) {
  let writeStream = fs.createWriteStream(outputFile, {flags: 'w'});

  writeStream.write('ID, ');
  for(let count = 1; count <= max_dimensions; count++) {
    writeStream.write('LOAD' + count);
    if(count !== max_dimensions) {
      writeStream.write(', ');
    }
  }
  writeStream.write('\n');

  for(let [customerId, loadValues] of dataMap.entries()) {
    writeStream.write(customerId + ', ');

    for(let count = 0; count < max_dimensions; count++) {
      if(count < loadValues.length) {
        writeStream.write(loadValues[count]);
      } else{
        writeStream.write('0');
      }

      if(count !== (max_dimensions - 1)) {
        writeStream.write(', ');
      }
    }

    writeStream.write('\n');
  }
};

let parser = parse({delimiter: ','}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
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
    callback();
  }, function (err) {
    if(err) {
      console.log(err);
    } else {
      console.log(dataMap);
      writeData(dataMap);
    }
  })
});

fs.createReadStream(inputFile).pipe(parser);
