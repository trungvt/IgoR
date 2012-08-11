Ext.define("Igor.controller.SubjectDetails", {
    extend: 'Ext.app.Controller',
    views: ['task.SubjectDetails'], // tương ứng sheet 7
    
    init: function() {
        
    },

    config: {
        control: {
            // classesListForm: 'List' {
            //     itemSelected: 'viewClassDetails',
            // }
            testButton: {
                tap: 'doTest'
            }
        },
        routes: {
            'subjectDetails/:id': 'doSubjectDetails'
            // Khi xuat hien url dang http://abc.com/#login thi se thuc hien ham showLogin
        },

        refs: {
            // Subject Details
            subjectDetailsForm: 'subjectDetailsForm',
            subjectDetailsPanel: 'subjectDetailsForm #subjectDetailsPanel',

            // Classes List By Subject
            classesListForm: 'subjectDetailsForm #selectClassesList'
        },

        before: {
            doSubjectDetails: ['getSubjectDetails', 'getAllClassesBySubject'],
            // Truoc khi thuc hien ham doLogin thi se invoke ham authenticate trước!
        }
    },

    // Hàm chính
    doSubjectDetails: function(id) {
        // var subjectStore = Ext.getStore('Subjects');
        // var result = subjectStore.findRecord('subject_id', id);
        Ext.data.JsonP.request({
            url: 'http://igor-assistant-ca-2012.appspot.com/igor/subject/call/jsonp/get_subject_detail/',
            params: {
                id: id
            },
            disableCaching: false,

            success: function(result, request) {
                var subjectDetailsStore = Ext.getStore('SubjectDetails'), subjectDetails = {};
                    subjectDetailsStore.removeAll();
                    subjectDetailsStore.sync();
                if (result.status == 'OK' && result.message != '') {
                    Ext.Array.each(result.message, function(subject) {      
                        subjectDetails = Ext.create('Igor.model.Subject', subject);
                        subjectDetailsStore.add(subjectDetails);
                        subjectDetailsStore.sync();
                    });
                }
            }
        });

        this.getAllClassesBySubject(id);
    },

    // (*) WS lấy về toàn bộ các classes của subject này
    getAllClassesBySubject: function(_id) {
        Ext.data.JsonP.request({
            url: 'http://igor-assistant-ca-2012.appspot.com/igor/class_subject/call/jsonp/get_classes_by_subject/',
            params: {
                subject_id: _id,
                term: '20111'
            },
            disableCaching: false,

            success: function(result, request) {
                var subjectClassesStore = Ext.getStore('SubjectClasses'), subjectClasses = {};
                    subjectClassesStore.removeAll();
                    subjectClassesStore.sync();
                if (result.status == 'OK' && result.message != '') {
                    Ext.Array.each(result.message, function(classDetails) {      
                        subjectClasses = Ext.create('Igor.model.Classdetail', classDetails);
                        subjectClassesStore.add(subjectClasses);
                        subjectClassesStore.sync();
                    });
                }
            }
        });
    },

    // Hàm này để xem chi tiết về 1 class
    viewClassDetails: function(class_id) {
        // Cập nhật route: .../classdetails/abc
        // Chuyển sang màn hình xem Class Details
        this.redirectTo('url');
    }
});