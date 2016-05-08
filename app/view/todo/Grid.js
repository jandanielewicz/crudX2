Ext.define('CrudExt.view.todo.Grid',{
    extend: 'Ext.grid.Panel',
    title        : 'Lista todo',
    itemId        : 'todoGrid',
    xtype        : 'todogrid',
    store         : 'ToDos',

    initComponent: function(){

        this.columns = [
            { header: 'Deadline date', dataIndex: 'deadline_datetime' },
            { header: 'Title', dataIndex: 'title'}
        ];

        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        text: 'Dodaj wpis',
                        iconCls: 'add',
                        action: 'add'
                    },
                    {
                        xtype: 'button',
                        text: 'Usuń wpis',
                        iconCls: 'delete',
                        action: 'delete'
                    },
                    {
                        xtype: 'button',
                        text: 'Edytuj wpis',
                        iconCls: 'edit',
                        action: 'edit'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: 'ToDos',
                dock: 'bottom',
                displayInfo: true
            }
        ];

        this.callParent(arguments);
    }

});