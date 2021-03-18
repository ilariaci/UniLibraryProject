


const  router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/help', component:Help},
      { path: '/books', component: Books },
      { path: '/personnel-login',component: Personnel_Login},
      { path:'/student-login', component: Student_Login},
      { path:"/reserved",name:"reserved",component: Reserved },
      { path:"/errorReservation", name:"reservationError",component:ReservationError},
      //{ path: '/chat', component: Chat },
      { path: '/book_search', name:'book-search',component: BookTextualSearchComponent },
      //{ path: '/student-personal-space', meta:{ studentAuthenticationRequired:true }}
      { path:'/staff-crud', name:'secure-crud', component: CRUD, meta:{staffAuthenticationRequired:true}},
      { path: '/404', component: NotFound },
      { path: '*', redirect: '/404' }

    ]
  })
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.staffAuthenticationRequired)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
          if (!data.isLoggedInAsStaff) {
              console.log("data.isLoggedInAsStaff"+data.isLoggedInAsStaff);
              next({
              path: '/personnel-login',
              query: { redirect: to.fullPath }
          })
          } else {
             next()
          }
   } else {
      //if(to.matched.some(record=>record.meta.studentAuthenticationRequired))
      next() // make sure to always call next()!
  }
})
