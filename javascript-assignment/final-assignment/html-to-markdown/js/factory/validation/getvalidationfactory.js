class GetValidationFactory {

    static getValidationRegex(elementType) {
        if (elementType === 'h1' || elementType === 'h2' || elementType === 'h3' ||
            elementType === 'h4' || elementType === 'h5' || elementType === 'h6') {
            return HEADING_VALIDATION_REGEX;
        }



    }
}