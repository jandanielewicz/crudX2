Ext.define('CrudExt.view.todo.Window', {

    extend: 'Ext.window.Window',
    title: 'Okno',
    height: 150,
    width: 400,
    layout: 'fit',
    modal: true,
    autoShow: true,
    alias: 'widget.todoedit',

    initComponent: function(){
        this.items = [Ext.widget('todoform')];
        this.callParent(arguments);
    }

});