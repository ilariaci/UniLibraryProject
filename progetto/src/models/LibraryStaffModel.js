module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var LibraryStaffSchema = new Schema({
        firstname: String, // String is shorthand for {type: String}
        lastname: String,
        password:String,
        institutional_email:String
    });
    return mongoose.model('librarystaff', LibraryStaffSchema, 'LibraryStaff');
};
