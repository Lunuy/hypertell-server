

function File(path : string, type : string) {
    return () => ({
        type: type,
        data: path
    });
}

export default File;