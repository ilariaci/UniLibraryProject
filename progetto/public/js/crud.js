const CRUD = {
  template: `

<div id="search_book_container">
  <h2>CRUD</h2>

  <button id="create_button" v-on:click="visualizeFormBookCreation();reset();$forceUpdate()">New Book</button>
  <div id="new" v-if="new_book_XOR_search_results==true">
   <form id="new_book" >

       <input type="text" placeholder="title" v-model="createdBook.title"></input>
       <input type="text" placeholder="authors" v-model="createdBook.authors"></input>
       <input type="text" placeholder="book_id" v-model="createdBook.book_id"></input>
       <input type="text" placeholder="last_active_borrow" v-model="createdBook.last_active_borrow"></input>
       <input type="text" placeholder="topics" v-model="createdBook.topics"></input>
       <input type="text" placeholder="publication_date" v-model="createdBook.publication_date"></input>
       <input type="text" placeholder="edition" v-model="createdBook.edition"></input>
       <input type="text" placeholder="status" v-model="createdBook.status"></input>
       <input type="text" placeholder="description_for_textual_search" v-model="createdBook.description_for_textual_search"></input>
       <button id="new_book" v-on:click="createNewBookCRUD()">Create</button>
       <div id="createdBookResponse" v-if="response.message">{{response.message}}</div>
       <div id="creationSuccessful" v-if="response._id">Creation Successful</div>

   </form>

       <button id="new_search" v-on:click="new_book_XOR_search_results=false;createSuccess=false;createUnsuccess=false;">New Search</button>
 </div>
 <div id="search_results" v-else>
  <div id="search_book_CRUD">
          <h3>Book Search CRUD</h3>
          <input type="text" name="book_id" v-model="book_id" placeholder="book ID, 5 characters" />
          <input type="text" name="title" v-model="title"  placeholder="book title" />
          <button type="button"  v-on:click="searchBookCRUD()">Search</button>
          <div>{{book_id}}</div>

  </div>


  <div  v-for="(book,index) in books" :key="books._id">
        <div class="book">
        <!--  <h5 class="card-title">{{book}}</h5>-->



          <div class="_id_piece">
           <div class="sub_id_piece">
               <strong>_id : </strong>
               <input class="_id_piece_input" type="text" v-if="isVisibleId(index)" v-model="book._id"/>
               <div class="_id_piece_display" v-else >{{book._id}}</div>
           </div>

            <button class="pencil_button" v-show="!isVisibleId(index)" v-on:click="indexIdVisibility[index]=true;$forceUpdate()">Modify</button>
            <button class="done_button" v-show="isVisibleId(index)" v-on:click="indexIdVisibility[index]=false;$forceUpdate()" >Done</button>

          </div>

          <div class="title_piece">
            <strong>Title: </strong>
            <input class="title_piece_input" type="text" v-if="isVisibleTitle(index)" v-model="book.title"/>
            <div class="title_piece_display" v-else >{{book.title}}</div>
            <button class="pencil_button" v-if="!isVisibleTitle(index)" v-on:click="indexTitleVisibility[index]=true;$forceUpdate()">Modify</button>
            <button class="done_button" v-if="isVisibleTitle(index)" v-on:click="indexTitleVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="authors_piece">
            <strong>Authors: </strong>
            <input class="authors_piece_input" type="text" v-if="isVisibleAuthors(index)" v-model="book.authors"/>
            <div class="authors_piece_display" v-else >{{book.authors}}</div>
            <button class="pencil_button" v-if="!isVisibleAuthors(index)" v-on:click="indexAuthorsVisibility[index]=true;$forceUpdate()">Modify</button>
            <button class="done_button" v-if="isVisibleAuthors(index)" v-on:click="indexAuthorsVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="book_id_piece">
            <strong>Book_id: </strong>
            <input class="book_id_piece_input" type="text" v-if="isVisibleBookId(index)" v-model="book.book_id"/>
            <div class="book_id_piece_display" v-else >{{book.book_id}}</div>
            <button class="pencil_button" v-if="!isVisibleBookId(index)" v-on:click="indexBookIdVisibility[index]=true;$forceUpdate()">Modify</button>
            <button class="done_button" v-if="isVisibleBookId(index)" v-on:click="indexBookIdVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="last_active_borrow_piece">
            <strong>Last Active Borrow: </strong>
            <input class="last_active_borrow_piece_input" type="text" v-if="isVisibleLastActiveBorrow(index)" v-model="book.last_active_borrow"/>
            <div class="last_active_borrow_piece_display" v-else >{{book.last_active_borrow}}</div>
            <button class="pencil_button" v-if="!isVisibleLastActiveBorrow(index)" v-on:click="indexLastActiveBorrowVisibility[index]=true;$forceUpdate()">Modify</button>
            <button class="done_button" v-if="isVisibleLastActiveBorrow(index)" v-on:click="indexLastActiveBorrowVisibility[index]=false;$forceUpdate()">Done</button>
          </div>


          <div class="topics_piece">
          <strong>Topics: </strong>
          <input class="topics_piece_input" type="text" v-if="isVisibleTopics(index)" v-model="book.topics"/>
          <div class="topics_piece_display" v-else>{{book.topics}}</div>
          <button class="pencil_button" v-if="!isVisibleTopics(index)" v-on:click="indexTopicsVisibility[index]=true;$forceUpdate()">Modify</button>
          <button class="done_button" v-if="isVisibleTopics(index)" v-on:click="indexTopicsVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="publication_date_piece">
          <strong>Publication Date: </strong>
          <input class="publication_date_piece_input" type="text" v-if="isVisiblePublicationDate(index)" v-model="book.publication_date"/>
          <div class="publication_date_piece_display" v-else> {{book.publication_date}} </div>
          <button class="pencil_button" v-if="!isVisiblePublicationDate(index)" v-on:click="indexPublicationDateVisibility[index]=true;$forceUpdate()">Modify</button>
          <button class="done_button" v-if="isVisiblePublicationDate(index)" v-on:click="indexPublicationDateVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="edition_piece">
          <strong>Edition: </strong>
          <input class="edition_piece_input" type="text" v-if="isVisibleEdition(index)" v-model="book.edition"/>
          <div class="edition_piece_display" v-else>{{book.edition}}</div>
          <button class="pencil_button" v-if="!isVisibleEdition(index)" v-on:click="indexEditionVisibility[index]=true;$forceUpdate()">Modify</button>
          <button class="done_button" v-if="isVisibleEdition(index)" v-on:click="indexEditionVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="status_piece">
          <strong>Status: </strong>
          <input class="status_piece_input" type="text" v-if="isVisibleStatus(index)" v-model="book.status"/>
          <div class="status_piece_display" v-else>{{book.status}}</div>
          <button class="pencil_button" v-if="!isVisibleStatus(index)" v-on:click="indexStatusVisibility[index]=true;$forceUpdate()">Modify</button>
          <button class="done_button" v-if="isVisibleStatus(index)" v-on:click="indexStatusVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

          <div class="description_for_textual_search_piece">
          <strong>Description for textual search: </strong>
          <input class="description_for_textual_search_piece_input" type="text" v-if="isVisibleDescriptionForTextualSearch(index)" v-model="book.description_for_textual_search"/>
          <div class="description_for_textual_search_piece_display" v-else>{{book.description_for_textual_search}}</div>
          <button class="pencil_button" v-if="!isVisibleDescriptionForTextualSearch(index)" v-on:click="indexDescriptionForTextualSearchVisibility[index]=true;$forceUpdate()">Modify</button>
          <button class="done_button" v-if="isVisibleDescriptionForTextualSearch(index)" v-on:click="indexDescriptionForTextualSearchVisibility[index]=false;$forceUpdate()">Done</button>
          </div>

        </div>
        <button id="update_button" class="crud_buttons" v-on:click="updateBookCRUD(index,book._id)">Update</button>
        <button id="delete_button" class="crud_buttons" v-on:click="deleteBookCRUD(index,book._id)">Delete</button>
  </div>
  <div id="not_found_msg">{{msg}}</div>

</div> <!--new_book_XOR_search_results-->
</div>






  `,

  data(){
    //deve poter accedere al token
    return{

      createUnsuccess:false,
      createSuccess:false,
      new_book_XOR_search_results:null,
      book_id:"",
      title:"",
      books:[],
      msg:null,
      modify_id:false,
      modify_title:false,
      modify_authors:false,
      modify_last_active_borrow:false,
      modify_book_id:false,
      ifSelected:{},
      update_book:null,
      counter:0,
      modify_id:[],
      indexIdVisibility:[],
      indexTitleVisibility:[],
      id:"_id",
      titlefield:"title",
      visibility:{},
      indexAuthorsVisibility:[],
      indexBookIdVisibility:[],
      indexLastActiveBorrowVisibility:[],
      indexTopicsVisibility:[],
      indexPublicationDateVisibility:[],
      indexEditionVisibility:[],
      indexStatusVisibility:[],
      indexDescriptionForTextualSearchVisibility:[],
      createdBook:{},
      response:{}

    }
  },
  methods:{
    visualizeFormBookCreation(){
      this.new_book_XOR_search_results=true
      return
    },
    reset(){
      this.createdBook.title="",
      this.createdBook.authors="",
      this.createdBook.book_id="",
      this.createdBook.last_active_borrow="",
      this.createdBook.topics="",
      this.createdBook.publication_date="",
      this.createdBook.edition="",
      this.createdBook.status="",
      this.createdBook.description_for_textual_search=""
    },
    createNewBookCRUD(){
        axios.post("/api/books",this.createdBook).then(response=>{console.log(response.data) ,this.msg=response.data}).catch(error=>(console.log(error)));

    },
     //richiede i dati che gli servono che popoleranno la pagina inviando però anche il token nella richiesta
     //quindi vengono inviati nel momento in cui sono richiesti
     searchBookCRUD(){
       console.log("u ve clicked")
       this.msg=null
       this.books=[]
       axios.post("http://localhost:3000/api/search_book",{/*AccessToken:localStorage.getItem('AccessToken'),*/book_id:this.book_id,title:this.title})
       /*.then(response => {this.books=response.data
       })*/
       .then(response =>{
         //ricevere lista libri
         this.title=null
         this.book_id=null
         console.log(response.data);
        if(response.data=="Libro non trovato nell'archivio")
        {
            this.msg=response.data
        }else
         this.books=response.data;
         /*this.books.forEach(function(book){
         console.log(book);
       });*/
        }).catch(error => (console.log(error)));
     },
     updateBookCRUD(index,id){
       updated_book=JSON.stringify(this.books[index])
       console.log("updated_book"+updated_book)
       //console.log("books{_id}"+books({_id}))
       console.log("Clicked update button, update request triggered..")
       axios.put('/api/books/'+id,this.books[index]).then(response=>{
         this.msg=response.data
         console.log(response)
       }).catch(error=>(console.log(error)))
       //axios.post("http://localhost:3000/api/update_book",{book_id:})
     },
     deleteBookCRUD(index,id){
       axios.delete('/api/books/'+id).then(response=>{
         console.log(response),this.books.splice(index,1)
         this.msg=response.data
       }).catch(error=>(console.log(error)))

     },
      //proprietà computed per "pulire" la data
      isVisibleId(index){
        if(this.indexIdVisibility[index]==true)
          return true;
        else
          return  false;

      },
      isVisibleTitle(index){
        if(this.indexTitleVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisibleAuthors(index){
        if(this.indexAuthorsVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisibleBookId(index){
        if(this.indexBookIdVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisibleLastActiveBorrow(index){
        if(this.indexLastActiveBorrowVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisibleTopics(index){
        if(this.indexTopicsVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisiblePublicationDate(index){
        if(this.indexPublicationDateVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisibleEdition(index){
        if(this.indexEditionVisibility[index]==true)
         return true
        else {
          return false
        }
      },
      isVisibleStatus(index){
        if(this.indexStatusVisibility[index]==true)
         return true
        else {
          return false
        }
      },

      isVisibleDescriptionForTextualSearch(index){
        if(this.indexDescriptionForTextualSearchVisibility[index]==true)
         return true
        else {
          return false
        }
      },

      isVisible(index,field){
        if(this.visibility[{index,field}]==true)
        return true
        else return false
      }


  }

 }
