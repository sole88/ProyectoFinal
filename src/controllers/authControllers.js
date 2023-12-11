const modelsUser = require('../models/user')


const authControllers ={
    loginView:  (req, res) => res.render('./auth/login', {view : {title: 'Login | Funkoshop',  error: req.query.error}}),
   
    loginUser:  async(req, res) => {  
        const { email, password } = req.body;
        const [valido] = await modelsUser.verificarUser(email, password);
        // console.log(valido) --> de aca llega una matriz dificil de recorrer por eso debo deconstruyo con [valido] 
        if (valido == undefined){ 
            res.redirect('/login/?error=1')
        }else{
            req.session.userid = valido.user_id //guardo id como sesion, el session no es parte de request debo crear la session 
            res.redirect(`/admin?user=${valido.user_id}`)}},

           
    registerView:  (req, res) =>{
        //if (req.session.userid) {logeado = true}{ res.reder('/auth/register',{view :{ title: 'Register', logeado}})}
        res.render('./auth/register', {view : {title: 'Register'}})
    },
  
     registerUser: async(req, res) => {
          const userSchema = {
          name : req.body.nombre,
          lastname : req.body.apellido,
          email : req.body.email,
          password: req.body.pass};

          const creado = await modelsUser.crearUser(userSchema)
          res.redirect('./auth/login')
     },

    logoutView: (req,res) =>{ 
        req.session = null;
        res.redirect('/home', {view: {title : "Logout"}})}
}

module.exports = authControllers;