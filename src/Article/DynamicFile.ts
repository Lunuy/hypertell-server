
import crypto from "crypto";
import fs from "fs";
import path from "path";

export interface Options {
    static: string,
    buffer: Buffer,
    root: string,
    ext: string,
    type: string
}

async function DynamicFile(options : Options) {
    const hash = crypto.createHash("sha1");
    const fileName = `${hash}.${options.ext}`;
    await fs.promises.writeFile(path.resolve(options.static, fileName), options.buffer);
    const serverPath = path.join(options.root, fileName);
    return () => ({
        type: options.type,
        data: serverPath
    });
}

export default DynamicFile;