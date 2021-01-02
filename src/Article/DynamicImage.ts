
import DynamicFile from "./DynamicFile";

export interface Options {
    static: string,
    buffer: Buffer,
    root: string,
    ext: string
};

async function DynamicImage(options : Options) {
    return await DynamicFile({
        ...options,
        type: "Image"
    });
}


export default DynamicImage;