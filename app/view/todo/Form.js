Ext.define('CrudExt.view.todo.Form', {
    extend: 'Ext.form.Panel',
    requires: [ 'Ext.form.Field'],
    defaultType: 'textfield',
    defaults: {
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 150
    },
    padding: 2,
    alias: 'widget.todoform',
    style: 'background-color: #c4c4c4;',
    border: false,

    initComponent: function () {

        this.items = [
            {
                name: 'deadline_datetime',
                fieldLabel: 'Deadline datetime',
                type: 'time',
                format: 'Y-m-d H:i:s',
                dateFormat: 'Y-m-d H:i:s',
                submitFormat: 'Y-m-d H:i:s',
                xtype: 'datefield'
            },
            {
                name: 'title',
                fieldLabel: 'Title'
            }
        ];

        this.bbar = [
            {
                text: 'Zapisz',
                action: 'save',
                itemId: 'save',
                iconCls: 'save'
            },
            {
                text: 'Anuluj',
                action: 'cancel',
                itemId: 'cancel',
                iconCls: 'cancel',
                handler: function () {
                    this.up('window').close();
                }
            }
        ];

        this.callParent(arguments);
    }
});