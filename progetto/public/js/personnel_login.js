//import router from ""./router";
const Personnel_Login = {
 template:
  `



<div id="login">
        <h2>Staff Login</h2>
        <input type="text" name="institutional_email" v-model="email" placeholder="institutional email" />
        <input type="password" name="password" v-model="password"  placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
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
  logintest() {
                if(this.email != "" && this.password != "") { // se diversi dalla stringa vuota
                    if(this.email == "Ilaria@Ilaria.it" && this.password == "password") {
                        this.$emit("authenticated", true); //emissione evento
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The email and / or password is incorrect");
                    }
                } else {
                    console.log("The email and password must be present");
                }
            },



            login() {
              console.log();
              axios.post("http://localhost:3000/api/personnel-login",{email:this.email,password:this.password})
              /*.then(response => {this.books=response.data
              })*/
              .then(response=>{ //SI DEVE PER FORZA USARE LA ARROW FUNCTION ALTRIMENTI NON SETTA I DATI DELLA LOCAL COMPONENT!!!
                //console.log(response);
              //  console.log(response.data);
              //  console.log('response.data.accessToken'+response.data.accessToken);
              if(response.data.accessToken){
                localStorage.setItem('AccessToken',response.data.accessToken);
                console.log(localStorage.getItem('AccessToken'));//arriva
                data.isLoggedInAsStaff=true;
                router.push({name:"secure-crud"});
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

        }/*,
        computed:{
          errMsgComputedForUpdates:function(){
            return this.errMsg
          }
        }*/

}
