module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    const BookSchema=new Schema({
      book_id:{type:String,required:true,unique:true},
      title:{type:String,required:true},
      publication_date:{type:Date},
      edition:{type:Number},
      topics:[String],
      authors:[String],
      description_for_textual_search:String,
      last_active_borrow:{
      begin_Date:{type:Date},
      end_Date:{type:Date},
      student_fresher:{type:Number}
    },
      status:{type:String,enum:['available','not available'],required:true}/*,
      downloadable_Version:{enum:['available','not available']},
      authors:[String]*/
    });
    return mongoose.model('bookmodel', BookSchema, 'Books');
};
