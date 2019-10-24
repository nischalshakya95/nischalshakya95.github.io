class TableElement extends ElementFactory {

    replace(node, tag) {
        console.log(node.rows);
        if (node.rows.length !== 0) {
            for (let i = 0; i < node.rows.length; i++) {
                for (let j = 0; j < node.rows[i].cells.length; j++) {
                    console.log(node.rows[i].cells[j]);
                }
            }
        }
    }

}