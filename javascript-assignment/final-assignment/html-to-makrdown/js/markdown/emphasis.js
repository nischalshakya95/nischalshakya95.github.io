class Emphasis extends Content {

    replaceStrong(content) {
        return STRONG + content + STRONG;
    }

    replaceEm(content) {
        if (content === '') return ''
        return EM + content + EM;
    }

}