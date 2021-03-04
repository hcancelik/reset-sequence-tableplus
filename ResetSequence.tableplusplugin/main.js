'use strict';

const reset = async function(context) {
    const item = context.clickedItem();
    const driver = context.driver();

    if (driver !== "PostgreSQL") {
        context.alert('Error', 'This option is only available for PostgreSQL.');
        return;
    }

    if (item == null) {
        context.alert('Error', 'Please select a table!');
        return;
    }

    const tableName = item.name();
    const statement = `SELECT setval('${tableName}_id_seq', (SELECT max(id) FROM ${tableName}));`;

    context.execute(statement, res => {
        if (res.errorPosition === -1) {
            SystemService.notify("Success", "Table " + item.name() + " sequence is successfully reset.");
        } else {
            context.alert('Error', res.message);
        }
    });
};


global.reset = reset;
