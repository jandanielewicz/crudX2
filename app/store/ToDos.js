Ext.define('CrudExt.store.ToDos',{
    extend: 'Ext.data.Store',
    autoLoad: true,
    autoSync: false,
    storeId: 'ToDos',
    pageSize: 20,
    model: 'CrudExt.model.ToDo',
    proxy: {
        type: 'ajax',
        api: {
            create  : 'php/todos.php?action=insert',
            read    : 'php/todos.php?action=fetchAll',
            update  : 'php/todos.php?action=update',
            destroy : 'php/todos.php?action=delete'
        },
        actionMethods: {
            create  : 'POST',
            read    : 'POST',
            update  : 'POST',
            destroy : 'POST'
        },
        reader: {
            type: 'json',
            root: 'data',
            rootProperty: 'data',
            messageProperty: 'message',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            root: 'data',
            writeAllFields: true,
            encode: true
        }
    }
});