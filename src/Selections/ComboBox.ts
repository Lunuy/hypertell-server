
function ComboBox(options : string[]) {
    return () => ({
        type: "ComboBox",
        data: options
    });
}

export default ComboBox;