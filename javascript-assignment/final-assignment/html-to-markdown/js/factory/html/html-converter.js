class HtmlConverter {

    replace(markdown) {

        markdown = markdown.replace(HEADING_ONE_REGEX, HEADING_ONE_REPLACE, null);
        markdown = markdown.replace(HEADING_TWO_REGEX, HEADING_TWO_REPLACE, null);

        markdown = markdown.replace(HEADING_SIX_REGEX, HEADING_SIX_REPLACE, null);
        markdown = markdown.replace(HEADING_FIVE_REGEX, HEADING_FIVE_REPLACE, null);
        markdown = markdown.replace(HEADING_FOUR_REGEX, HEADING_FOUR_REPLACE, null);
        markdown = markdown.replace(HEADING_THREE_REGEX, HEADING_THREE_REPLACE, null);

        markdown = markdown.replace(BLOCKQUOTE_REGEX, BLOCKQUOTE_REPLACE, null);

        markdown = markdown.replace(IMAGE_REGEX, IMAGE_REPLACE, null);

        markdown = markdown.replace(LINK_REGEX, LINK_REPLACE, null);

        return markdown;
    }
}
