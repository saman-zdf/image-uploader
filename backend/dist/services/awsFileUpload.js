var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
function uploadFileToS3(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: get file from request
        // const image = req.body.image;
        const params = {
            Bucket: process.env.S3_BUCKET || "saman-fayazi",
            Body: "This is the second file",
            Key: "my-second-file.txt",
        };
        const result = yield s3.putObject(params).promise();
        console.log(`Uploaded file to S3 bucket ${process.env.S3_BUCKET}`);
        if (result) {
            res.send({
                message: "File uploaded successfully in ",
                result,
            });
        }
    });
}
export default uploadFileToS3;
