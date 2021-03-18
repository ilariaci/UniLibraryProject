var Books = {
	template: `

	<div class="row">
		<div class="col">
			<div class="card" v-for="book in books" :key="books._id">
				<div class="row no-gutters">
					<div class="col-md-4">

					</div>
					<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">{{ book}}</h5>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


<ul id="book-list">
	<li v-for="book in books" >
			{{book.title}}
	</li>
</ul>





	`,
	data() {
		return {
			books: []

		}
	},

	methods: {
		listBooks: function () {
			axios.get("http://localhost:3000/api/books")
			/*.then(response => {this.books=response.data
			})*/
			.then(function(response){
				data.books=response.data;
				data.books.forEach(function(book){
					console.log(book);

				});


			}).catch(error => (console.log(error)));

		},
		//init chiama listBooks
		init: function(){
			this.listBooks();

			/*console.log("executing init");
			this.books.forEach(function(book){
				console.log(book);
			});
			console.log("those were the books");*/

		}
	},
	//quando la componente viene montata la funzione mounted chiama init
	mounted(){
		this.init();
		//console.log("init mounted");
	}

}
