/*
	This handles parsing and validating the CSV file to ensure that it has the required
	columns, and then passes on the data
*/

// Dependencies
const csv = require('fast-csv');
const fs = require('fs');
const headers = true;

// Validate and parse the CSV file, and then return a list of objects featuring the fields and values
const validateAndParse = results => {
	return data => {
        // fields in the csv file are the headers - text - the first row in the csv file
		let { text } = data;
		if (!text) {
			throw new Error(
				'Missing one or more of the following fields: text'
			);
		}
		results.push({ text });
	};
};

const parseFile = async inputFilePath => {
	const results = [];
	const stream = fs.createReadStream(inputFilePath);
	const csvStream = new Promise((resolve, reject) => {
		csv.parseStream(stream, { headers })
			.on('data', validateAndParse(results))
			.on('error', reject)
			.on('end', () => resolve(results));
	});
	return await csvStream;
};

module.exports = parseFile;
