
var BookTextualSearchComponent=
{

  template:
              `

              <div id="textual-search" > <!--necessario un elemento root-->
              <h2 class="title">Book Search</h2>
                <template id="research-container" >
                <label for="keywords" class="visuallyhidden">Search:</label>
                  <input type="text" v-model="keywords" v-if="notAnswered===true" id="keywords" name="keywords"  placeholder="Please write the keyword/s to find the book, es title, edition, author/s etc :-)"/>
                  <button class="form-button" type="button" v-if="notAnswered===true" v-on:click="findWithTextualSearch()">Go</button>
                </template>



                  <ul id="books-list-container">
                  <li class="book-element" v-for="book in books" v-bind:key=book.book_id>
                   <div class="book">
                    <div class="book_list_element">book_id:{{book.book_id}}</div>
                    <div class="book_list_element">book title: {{book.title}}</div>
                    <div class="book_list_element">authors:{{book.authors}}</div>
                    <div class="book_list_element">publication date:{{book.publication_date}}</div>
                    <div class="book_list_element">edition:{{book.edition}}</div>
                    <div class="book_list_element">status:{{book.status}}</div>
                    <button class="book_list_button_prenotazione" v-if="book.status=='unavailable' && data.isLoggedInAsStudent" v-on:click="insertReservation(book.book_id)">Reserve</button>
                  </div>
                  </li>
                  </ul>

                </div>



               `
           ,
           data(){
             return{

               //reserved:[],
               book_id:"",
               token:"",
               notAnswered:true,
               keywords:"",
               books:[],
               //notAnswered:"false"
               items: [
                        { message: 'Foo' },
                        { message: 'Bar' }
                      ],
                fiori:[
                  'viola', 'betulla'
                ]
             }
           },
           methods:{
             findWithTextualSearch(){
                  if(this.keywords) //not null, not undefined, not empty
                  {
                    axios.post("/api/textual_search",{content:this.keywords})
                         .then(response=>  {this.books = response.data //con l'arrow function non funziona
                           this.notAnswered="false";
                           /*this.books.forEach(function(book){console.log(book.title)});*/
                         }).catch(error=>(console.log(error)));


                  }
              },
              insertReservation(book_id){
                this.book_id=book_id
                this.token=localStorage.getItem('AccessToken')
                console.log("student token"+this.token)
                console.log("book_id"+this.book_id)
                  axios.post('/api/insert_reservation',{book_id:this.book_id,AccessToken:this.token}).then(response=>{console.log(response);router.push({name:"reserved"});})
                  .catch(error=>{console.log(error);router.push({name:"reservationError"});});

              }//end insertReservation
            }//end methods
  }//end local component
