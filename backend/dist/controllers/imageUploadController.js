var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import uploadFileS3 from "../services/awsFileUpload.js";
import cloudinary from "../services/cloudinaryFileUpload.js";
import { db } from "../utils/db.server.js";
const cloudinaryUploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image;
    console.log("FIle", file);
    try {
        // @ts-ignore
        const result = yield cloudinary.uploader.upload(file === null || file === void 0 ? void 0 : file.tempFilePath, {
            folder: "image_upload_challenge",
            use_filename: true,
            // @ts-ignore
            public_id: file === null || file === void 0 ? void 0 : file.md5,
            unique_filename: false,
        });
        console.log("Finish uploading in service");
        yield db.image.create({
            data: {
                imageURL: result.secure_url,
            },
        });
        res.status(201).json({ result: result.secure_url });
        return result;
    }
    catch (error) {
        console.log("File", file);
        console.log("This is the error ", error);
    }
});
const s3UploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield uploadFileS3(req, res);
    res.status(201).json({ imageLink: result });
});
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const image = yield db.image.findFirst({
            where: {
                id,
            },
        });
        if (!image)
            return res.status(404).json({ message: "Image not found" });
        res.status(200).json({ image });
    }
    catch (error) {
        console.log("This is the error ", error);
    }
});
export { cloudinaryUploadImage, s3UploadImage, getImage };
