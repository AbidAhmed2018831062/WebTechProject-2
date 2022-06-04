 function validateUser({name,username,email,password},){
    let errors={};
    var emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailReg.test(email))
        errors.email='The email is not valid';
     if(email.length===0)
    errors.email="Email is required";
    if(username.length===0){
      errors.username="Username is required";
    }
    if(name.length===0)
    errors.name='Name is required';
    if(password.length===0)
    errors.password="Password is required";
    else{
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
       if(!strongPassword.test(password))
       {
           errors.password='Password needs to have one uppercase, lowercase, special character and atelast 8characters';
       }
    }
   // console.log("Abid");
    return errors;
}
module.exports=validateUser;