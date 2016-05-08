Ext.Loader.setConfig(
    {
        enabled: true
    }
);

Ext.application({
    name: 'CrudExt',
    controllers: ['ToDo'],
    appFolder: 'app',
    launch: function() {
        Ext.create('Ext.container.Viewport',{
            items: [Ext.create('CrudExt.view.todo.Grid')],
            layout: 'fit'
        });
    }
});