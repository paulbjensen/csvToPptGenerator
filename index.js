// Dependencies
const parseFile = require('./parseCsvFile');
const generateFile = require('./generatePptFile');

const main = async (inputFilePath,outputFilePath) => {

    // Read the csv file from the input file path
    const csvData = await parseFile(inputFilePath);

    // send the data to a ppt generator with the output file path and csv data
    await generateFile({data: csvData, filePath: outputFilePath});
}

(async () => {
    await main('./example.csv', 'example.pptx');
})();