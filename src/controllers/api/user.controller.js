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
  

module.exports = {

    createResumeAnalyticsZainul: async (req, res) => {

        try {
            
            if (!req.files || !req.files.pdf) {
                return Response.errorResponseWithoutData(res, 'Pdf file is required')
            }

            if (req.files.pdf.size > FILE_SIZE_LIMIT.PDF ) {
                return Response.errorResponseWithoutData(res, 'Pdf file must not be greater then 5mb')
            }

            const uploadPdf = await Helper.pdfUpload(req.files.pdf, 'public/assets/pdfs/')

            const pdfPath = `/${uploadPdf}`;

            const resolvedPdfPath = path.join(path.resolve(__dirname, '../../../') + pdfPath);
            const pdfBuffer = fs.readFileSync(resolvedPdfPath);
            const pdfData = await pdfToText(pdfBuffer);
            const resumeText = pdfData.text;
     
            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a resume evaluator. You are given a payslips. You give response in json only. Do not write anything extra in begining or end'
                    },
                    { 
                        role: 'user', 
                        content: `You are provided with a text extracted from a pdf resume. You have to return response with these keys. Name, email, contact, address(string), skills. Also you can give suggestion to improve user resume.
                        Here is the text ${resumeText}`
                    }
                ],
                model: 'gpt-4o',
              });
            
              const data = chatCompletion.choices[0].message.content;
            
            return res.status(200).json({data});

        } catch (error) {
            
            console.log('error=>', error);
            return res.status(500).json({ error: "Something went wrong" });
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