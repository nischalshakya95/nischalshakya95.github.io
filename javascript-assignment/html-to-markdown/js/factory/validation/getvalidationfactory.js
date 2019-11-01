class GetValidationFactory {

    static getValidation(elementType) {
        if (elementType === 'h1' || elementType === 'h2' || elementType === 'h3' ||
            elementType === 'h4' || elementType === 'h5' || elementType === 'h6') {
            return new HeadingValidation();
        }

    }
}