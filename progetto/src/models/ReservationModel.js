module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    const ReservationSchema=new Schema({
      book_id:{type:String,required:true},
      book_title:{type:String},
      book_edition:{type:Number},
      student_institutional_email:{type:String,required:true},
      reservation_date:{required:true,type:Date}
    }) ;
    return mongoose.model('reservationmodel', ReservationSchema, 'Reservations');
};
