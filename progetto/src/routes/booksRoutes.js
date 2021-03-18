module.exports = function(app) {

	var booksController = require('../controllers/booksController');
	var staffCredentialsController=require('../controllers/staffCredentialsController');
	//var studentsCredentialsController=require('../controllers/studentsCredentialsController');
	var studentsCredentialsController=require('../controllers/studentsCredentialsController');




	app.route('/api/books')
		.get(booksController.list_books)
		.post(booksController.create_book);

app.route('/api/search_book')
	.post(booksController.search_book);
	app.route('/api/textual_search')
	.post(booksController.textual_search);

	app.route('/api/books/:id')
		.get(booksController.read_book)
		.put(booksController.update_book)
		//.put(booksController.after_update)
		.delete(booksController.delete_book);

	app.route('/api/personnel-login')
		.post(staffCredentialsController.validate);

	app.route('/api/students-login')
	.post(studentsCredentialsController.validate);

	app.route('/api/insert_reservation')
	.post(booksController.insert);




	app.use(booksController.show_index);
};
