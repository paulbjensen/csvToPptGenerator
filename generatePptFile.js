// Dependencies
const officegen = require('officegen');
const fs = require('fs');

const generateFile = async ({data, filePath}) => {
    try {
        // Create an instance of the PPTX generator
        const pptx = officegen('pptx');

		// Set the title of the PPTX file
		pptx.setDocTitle('My powerpoint file from CSV');        

        // Set ppt to widescreen
        pptx.setWidescreen(true);

        data.forEach(({text}) => {
            const currentSlide = pptx.makeNewSlide();
            // This is a basic example - the API has changed from when I first gave the presentation
            currentSlide.addText(
                    [
                        text,
                        {
                            font_size: 14
                        }
                    ]                
            )
        })

		// Save the file to disk
		const out = fs.createWriteStream(filePath);
		out.on('error', err => console.log(err));
		pptx.generate(out);
		return null;


    } catch (err) {
        console.error(err);
    }
}

module.exports = generateFile;