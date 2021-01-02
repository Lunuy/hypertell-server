
function Text(text : string) {
    return () => ({
        type: "Text",
        data: text
    });
}

export default Text;