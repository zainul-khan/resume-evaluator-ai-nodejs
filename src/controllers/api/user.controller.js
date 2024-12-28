const Joi = require("joi");
const { User } = require('../../models/User.model.js');
const Response = require("../../utils/response.utils.js");
const Helper = require("../../utils/helper.utils.js");
const { USER_STATUS, FILE_SIZE_LIMIT } = require("../../utils/constant.utils.js")
const fs = require("fs");
const path = require('path');
const pdfToText = require('pdf-parse');
const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});
//hi

module.exports = {

    createResumeAnalyticsZainul: async (req, res) => {

        try {

            if (!req.files || !req.files.pdf) {
                return Response.errorResponseWithoutData(res, 'Pdf file is required')
            }

            if (req.files.pdf.size > FILE_SIZE_LIMIT.PDF) {
                return Response.errorResponseWithoutData(res, 'Pdf file must not be greater then 5mb')
            }

            const uploadPdf = await Helper.pdfUpload(req.files.pdf, 'public/assets/pdfs/')

            const pdfPath = `/${uploadPdf}`;

            const resolvedPdfPath = path.join(path.resolve(__dirname, '../../../') + pdfPath);
            const pdfBuffer = fs.readFileSync(resolvedPdfPath);
            const pdfData = await pdfToText(pdfBuffer);
            const resumeText = pdfData.text;

            console.log('resumeText', resumeText)

            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a resume evaluator. You are given a resume. You give response in json only. Do not write anything extra in begining or end'
                    },
                    {
                        role: 'user',
                        content: `You are provided with a text extracted from a pdf resume. You have to return response with these keys. name(string), contact(string),email(string), social_links(array), education_area(array), skill_set(array), work_expereince(array), projects (array). Also you can give suggestions(array) to improve user resume.
                        Here is the text ${resumeText}`
                    }
                ],
                model: 'gpt-4o',
                response_format: { type: "json_object" },
            });

            const resumeData = JSON.parse(chatCompletion.choices[0].message.content);

            const htmlGeneratedWithSuggestions = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You a json to html converter that creates its own design and html tags. Strictly return response in HTML only without writing any extra unrelated to the data`
                    },
                    {
                        role: 'user',
                        content: `Covert the given json information to html. This is a json object use beautiful internel css and return a full fledged html page out of this json. This is the data ${JSON.stringify(resumeData)} there is a section called suggestion so instead of adding it directly strictly implenent those suggestions with mock data. Again do not shows suggestion implemented as a section rather implement them as a mock data`
                    }
                ],
                model: 'gpt-4o'
            });


            const htmlData = htmlGeneratedWithSuggestions.choices[0].message.content

            var cleanedHtml = htmlData.replace(/[\n\\]/g, ' ');
            // Now, cleanedHtml will have all backslashes removed and all newline characters replaced with a space.


            return res.status(200).json({ 
                resumeData,  
                cleanedHtml
            });

        } catch (error) {

            console.log('error=>', error);
            return res.status(500).json({ error });
        }
    },

    createResumeAnalyticsYash: async (req, res) => {

        try {

        } catch (error) {

            console.log('error=>', error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },


    createResumeAnalyticsSaddam: async (req, res) => {

        try {

        } catch (error) {

            console.log('error=>', error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

    createResumeAnalyticsAnkit: async (req, res) => {

        try {

        } catch (error) {

            console.log('error=>', error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    },

}