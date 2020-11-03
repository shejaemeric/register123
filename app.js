const path_1 = require('path');
const file_1 = require('fs');
const express_1 = require('express');
const os_1 = require ('os');
const { Console } = require('console');
const url = require('url')
const querystrings = require('querystring')
const exphbs = require('express-handlebars')

const app = express_1();


//--------------homepage------------------


app.get('/',(req,res)=>{
    
    res.sendFile(path_1.join(__dirname,'public','index.html'));

}) 


//--------------signin------------------

app.get('/signin.html',(req,res)=>{
    
    res.sendFile(path_1.join(__dirname,'public','signin.html'));

}) 

//--------------signup------------------


app.get('/signup.html',(req,res)=>{
    
    res.sendFile(path_1.join(__dirname,'public','signup.html'));
 
}) 


//--------------signup js and storing info------------------

app.get('/public/new',(req,res)=>{
    
    var fname = req.query.fname;
    var lname = req.query.lname;
    var email = req.query.email;
    var pass = req.query.pass;
    var proff = req.query.proff;
    contact = `${fname}^^^${lname}^^^${email}^^^${pass}^^^${proff}`
    file_1.appendFile(path_1.join(__dirname,'chat','allcontacts.txt'),contact + "\n",(err)=>{

        if (err) throw err
        console.log('contact added');
    })

    file_1.mkdir(path_1.join(__dirname,'chat',`/${email}`),{},function(e){
      
        if (e) throw e;
        else {
            console.log('folder created.....');
            res.sendFile(path_1.join(__dirname,'public','signin.html'));
            file_1.writeFile(path_1.join(__dirname,'chat',`/${email}`,'login.txt'),`${pass}`, err=>{})
            
    }

  
  });
})  






//-------------------chat(contact,message....)--------------------------

app.get('/public/main.html',(req,res)=>{

    main_path = path_1.join(__dirname,'public','main.html');
    res.sendFile(main_path)
})
  



//--------------signin js and checking for credentials------------------
 

app.get('/public/public/signin',(req,res)=>{
    
    var email = req.query.email;
    var pass = req.query.pass;

    fo_path = path_1.join(__dirname,'chat',`${email}`)

    if (file_1.existsSync(fo_path))//check if user folder exist

    file_1.readFile(path_1.join(fo_path,'login.txt'),'utf8',(err,data)=>{//check password

        if (data===pass){
             
             res.send(`<body style="background-color: black;">  <h1 style="  color :  rgb(43, 115, 248) ;
             text-shadow: 0px 1px rgb(43, 115, 248);
             font-style: oblique;
             margin-top: 16% ;
             margin-left: 150px;  
             font-size: 100px;"> welcome ${email}</h1> </body>`)
             
            }
 
        else  {res.send(`<body style="background-color: black;">  <h1 style="  color :  rgb(43, 115, 248) ;
        text-shadow: 0px 1px rgb(43, 115, 248);
        font-style: oblique;
        margin-top: 16% ;
        margin-left: 150px;  
        font-size: 100px;"> incorect credentials pls sign up</h1> </body>`)}
        
     })

    
})  















//-------------port listen-------------------

const port_1 = process.env.PORT || 8888; 

app.listen(port_1,()=> console.log('server is running at port ' + port_1))



      