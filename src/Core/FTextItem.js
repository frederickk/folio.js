/*
 *
 * FTextItem.js
 *
 * A collection of extensions for paper.TextItem
 *
 */


/**
 *
 * paper.TextItem
 *
 */
paper.TextItem.inject({
    // ------------------------------------------------------------------------
    /**
     *
     * @return {String} content which will will fit within the bounds of the TextItem
     *
     */
    trimToFit: function() {
        var visibleContent = this.visibleRange.content.trim();
        this.content = visibleContent;
        return this;
    }

});


