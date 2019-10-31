class HeadingValidation extends ValidationFactory {

    isInvalid(str, tag) {
        let reg = new RegExp('(<\/?' + tag + '>)', 'im');
        console.log(reg.test(str));
        if (reg.test(str)) {
            reg = new RegExp('(?!<\/?' + tag + ')(<\/?\w+>)', 'im');
            console.log(reg.test(str))
        } else {
            return false;
        }
    }
}