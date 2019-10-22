class Emphasis {

    replaceStrong(content) {
        return STRONG + content + STRONG;
    }

    replaceEm(content) {
        if (content === '') return ''
        return EM + content + EM;
    }

}