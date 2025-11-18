import bcrypt from 'bcrypt';
import User from '../DB/sct/user.js';
 
/*
Funcion para manejar el login de usuarios
*/
async function login() {

let test 
let tests
const user= await User.findOne({user: test})
if(!user){
    console.log("user not found");
    return;
}
 let pass = user.password;
 if(bcrypt.compare(tests, pass)){
    console.log("Login exitoso");
 }else{
    console.log("Login fallado")
    return;
 }
}
