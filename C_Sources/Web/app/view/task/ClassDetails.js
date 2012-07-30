Ext.define("Igor.view.task.ClassDetails", {
    extend: 'Ext.navigation.View',
    xtype: 'classDetailsForm',

    requires: [
        'Ext.List',
        'Igor.store.Classdetails',
        'Igor.store.Classprojects'
    ],

    config: {
        autoDestroy: false,

        navigationBar: {
            items: [
                {
                    xtype: 'image',
                    docked: 'top',
                    ui: 'light',
                    width: 100,
                    height: 45,
                    src: 'resources/images/Igor.png'
                }
            ]
        },

        items: [
            {
                xtype: 'container',
                layout: 'vbox',
                cls: 'userInfo',
                title: 'Class Detail',

                items: [
                    {
                        xtype: 'dataview',
                        flex: 1,
                        scrollable: false,

                        store: 'Classdetails',
                        itemTpl: [
                            '<div class="header">',
                            '   <div class="avatar" style="background-image:url(resources/images/class-icon.png);"></div>',
                            '   <h3>{subject_code}-{subject_name}</h3>',
                            '   <h4>ID: {class_code}</h4>',
                            '</div>',
                            '<div class="x-container x-form-fieldset nonEditable" style="padding: 1em;">',
                                '<div class="x-docking-vertical">',
                                    '<div class="x-body">',
                                        '<div class="x-inner x-form-fieldset-inner">',
                                            '<div class="x-container x-field-text x-field x-label-align-left x-field-labeled x-form-label-nowrap x-empty">',
                                                '<div class="x-form-label" style="width: 30% !important;">',
                                                    '<span>Session</span>',
                                                '</div>',
                                                '<div class="x-component-outer">',
                                                    '<div class="x-field-input">',
                                                        '<input class="x-input-el x-form-field x-input-text" type="text" value="{total_session}">',
                                                        '<div class="x-field-mask" style="display: none !important; "></div>',
                                                    '</div>',
                                                '</div>',
                                            '</div>',
                                            '<div class="x-container x-field x-field-text x-label-align-left x-field-labeled x-form-label-nowrap x-empty">',
                                                '<div class="x-form-label" style="width: 30% !important; ">',
                                                    '<span>Teacher</span>',
                                                '</div>',
                                                '<div class="x-component-outer">',
                                                    '<div class="x-field-input">',
                                                        '<input class="x-input-el x-form-field x-input-email" type="email" value="{teacher_name}">',
                                                        '<div class="x-field-mask" style="display: none !important; "></div>',
                                                    '</div>',
                                                '</div>',
                                            '</div>',
                                            '<div class="x-container x-field-text x-field x-label-align-left x-field-labeled x-form-label-nowrap x-empty">',
                                                '<div class="x-form-label" style="width: 30% !important; ">',
                                                    '<span>Location</span>',
                                                '</div>',
                                                '<div class="x-component-outer">',
                                                    '<divclass="x-field-input">',
                                                        '<input class="x-input-el x-form-field x-input-email" type="text" value="{location}">',
                                                        '<div class="x-field-mask" style="display: none !important; "></div>',
                                                    '</div>',
                                                '</div>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>'
                        ].join('')
                    },

                    {
                        xtype: 'list',
                        store: 'Classprojects',
                        flex: 1,

                        cls: 'x-feeds',
                        itemTpl: [
                            '<div class="feed" style="background-image:url(resources/images/headshots/project_icon.png);"></div>',
                            '{name}',
                            '{description}',
                        ].join(''),

                        items: [
                            {
                                xtype: 'listitemheader',
                                cls: 'dark',
                                html: 'Projects'
                            }
                        ]

                    }
                ]
            }
        ]
    },

    initialize: function() {
        var store = Ext.data.StoreManager.lookup('Classdetails');
        store.load({
            callback: function(records, operation, success) {
                    var class1 = store.first();
                    console.log('Class code is: ' + class1.get('class_code'));

                    class1.projects().each(function(project) {
                        console.log("Project ID: " + project.getId());
                    });
                },
                scope: this
        });
    }
});