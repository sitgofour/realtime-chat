

const botFunction = () => {
    return "hello from bot";
}

const parseIncomingMessage = (msg) => {
    if(msg === "are you a bot?") {
        return "definitely not!";
    } else {
        return "";
    }
}


exports.botFunction = botFunction;
exports.parseIncomingMessage = parseIncomingMessage;