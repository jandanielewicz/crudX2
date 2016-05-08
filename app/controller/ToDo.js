Ext.define('CrudExt.controller.ToDo', {
    extend: 'Ext.app.Controller',
    views: ['todo.Grid', 'todo.Form', 'todo.Window'],
    models: ['ToDo'],
    stores: ['ToDos'],
    refs: [
        {
            ref: 'list',
            selector: 'todogrid'
        }
    ],

    init: function () {
        this.control({
            'todogrid button[action=edit]': {
                click: this.edit
            },
            'todogrid': {
                itemdblclick: this.edit
            },
            'todogrid button[action=add]': {
                click: this.add
            },
            'todogrid button[action=delete]': {
                click: this.destroy
            },
            'todoform button[action=save]': {
                click: this.save
            }
        });
    },

    add: function () {
        var that = this,
                  view = Ext.widget('todoedit');

        view.setTitle('Dodawanie wpisu ToDo');
    },

    edit: function (btn) {
        var that = this,
            grid = that.getList(),
            records = grid.getSelectionModel().getSelection();

        if (records.length === 1) {
            var record = records[0],
                view = Ext.widget('todoedit'),
                form = view.down('todoform').getForm();

            form.loadRecord(record);
            view.setTitle('Edycja wpisu ToDo');
        } else {
            Ext.Msg.alert('Error', 'Wybierz jeden wpis do edycji');
        }
    },

    save: function (btn) {
        var that = this,
            form = btn.up('todoform'),
            getForm = form.getForm(),
            win = form.up('window'),
            grid = that.getList(),
            store = grid.getStore(),
            values = getForm.getValues(),
            record = getForm.getRecord();


        if (getForm.isValid()) {
            if (!record) {
                record = Ext.create('CrudExt.model.ToDo');
                record.set(values);
                store.add(record);
            } else {
                record.set(values);
            }

            store.sync();
            win.close();

        } else {
            Ext.Msg.alert('Error', 'Złe dane');
        }
    },

    destroy: function () {
        var that = this,
            grid = that.getList(),
            store = grid.getStore(),
            records = grid.getSelectionModel().getSelection();

        if (records.length === 0) {
            Ext.Msg.alert('Error', 'Nie wybrano wpisu');
        } else {
            Ext.Msg.show({
                title: 'Potwierdzenie',
                msg: 'Czy na pewno chcesz usunąć?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.WARNING,
                scope: this,
                width: 420,
                fn: function (btn, ev) {
                    if (btn == 'yes') {
                        store.remove(records);
                        store.sync();
                    }
                }
            });
        }
    }
});