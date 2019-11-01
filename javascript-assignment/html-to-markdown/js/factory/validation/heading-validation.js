class HeadingValidation extends ValidationFactory {

    str = /\s*(?!^<h1>)(?!<\/h1>$)(<\/?h[1-6]|<\/?p>)/;

    end = '(<\\/?h[1-6]|<\\/?p>|<\\/?div>)';

    isInvalid(str, tag) {
        if (str.startsWith('<' + tag + '>') && str.endsWith('</' + tag + '>')) {
            let reg = new RegExp('(?!^<' + tag + '>)' + '(?!<\/' + tag + '>)$' + this.end, 'im');
            return reg.test(str);
        } else {
            return true;
        }
    }
}