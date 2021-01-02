

function VKComboBox<V>(options : {[name : string]: V}) {
    return () => ({
        type: "VKComboBox",
        data: options  
    });
}

export default VKComboBox;