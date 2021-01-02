
function IComboBox(options : string[]) {
    return () => ({
        type: "IComboBox",
        data: options
    });
}

export default IComboBox;