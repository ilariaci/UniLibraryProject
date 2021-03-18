module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    const NotificationSchema=new Schema({
      book_id:{type:String,required:true},
      student_institutional_email:{type:String,required:true}
    }) ;
    return mongoose.model('notificationmodel', NotificationSchema, 'Notifications');
};
