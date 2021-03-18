//import router from ""./router";
const Student_Login = {
 template:
  `
  <div id="login">
        <h2>Student Login</h2>
        <input type="text" name="institutional_email" v-model="email" placeholder="institutional email" />
        <input type="password" name="password" v-model="password"  placeholder="Password" />
        <button type="button" v-on:click="loginProva()">Login</button>
          <div class="error_message_line">{{this.errMsg}}</div>
  </div>
`,
data(){
  return{
    email:"",
    password:"",
    errMsg:""
  }
},
methods:{


            login() {
              console.log("email e password dal file students_login"+" "+this.email+" "+this.password);
             axios.post("http://localhost:3000/api/students-login",{email:this.email,password:this.password})
              /*.then(response => {this.books=response.data
              })*/
              .then(function(response){
                //console.log(response);
              //  console.log(response.data);
              //  console.log('response.data.accessToken'+response.data.accessToken);
              if(response.data.AccessToken){
                localStorage.setItem('AccessToken',response.data.accessToken);
                console.log(localStorage.getItem('AccessToken'));//arriva
                data.isLoggedInAsStudent=true;

                router.push({name:"book-search"});
              }else{
                this.errMsg=response.data;
                console.log("response.data: "+response.data);
                console.log("this.errMsg: "+this.errMsg);
                console.log("data.errMsg: "+data.errMsg);
              }
              //  router.push({name:"student-private-space"});
              /*this.$router.replace({name:"secure"});*/
            }).catch(error => (console.log(error)));



          }//login()
          ,
          loginProva() {
            console.log();
            axios.post("http://localhost:3000/api/students-login",{email:this.email,password:this.password})
            /*.then(response => {this.books=response.data
            })*/
            .then(response=>{ //SI DEVE PER FORZA USARE LA ARROW FUNCTION ALTRIMENTI NON SETTA I DATI DELLA LOCAL COMPONENT!!!
              //console.log(response);
            //  console.log(response.data);
            //  console.log('response.data.accessToken'+response.data.accessToken);
            if(response.data.accessToken){
              localStorage.setItem('AccessToken',response.data.accessToken);
              console.log(localStorage.getItem('AccessToken'));//arriva
              data.isLoggedInAsStudent=true;
              router.push({name:"book-search"});
            }else{
              this.errMsg=response.data;
              console.log("response.data: "+response.data);
              console.log("this.errMsg: "+this.errMsg);
              console.log("data.errMsg: "+data.errMsg);


            }

          }).catch(error => (console.log(error)));



            },

            errMsgMethodForUpdate(){
              return this.errMsg
            }




        }//methods
}//component
