Ext.define('CrudExt.model.ToDo',{
    extend        : 'Ext.data.Model',
    fields        : ['id', 'title', 'deadline_datetime'],
    idProperty    : 'id'
});