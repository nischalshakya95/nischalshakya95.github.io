class HtmlConverter {

    replace(markdown) {

        markdown = markdown.replace(HEADING_ONE_REGEX, HEADING_ONE_REPLACE);
        markdown = markdown.replace(HEADING_TWO_REGEX, HEADING_TWO_REPLACE);

        markdown = markdown.replace(HEADING_SIX_REGEX, HEADING_SIX_REPLACE);
        markdown = markdown.replace(HEADING_FIVE_REGEX, HEADING_FIVE_REPLACE);
        markdown = markdown.replace(HEADING_FOUR_REGEX, HEADING_FOUR_REPLACE);
        markdown = markdown.replace(HEADING_THREE_REGEX, HEADING_THREE_REPLACE);

        return markdown;
    }

}
