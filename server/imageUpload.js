
const path = require("path");
let imageErrors;
const imageUpload=(file)=>{
     
    const ext=path.extname(file.name);
    const fileNa=file.name.replace(ext,"").split(" ").join("-")+Date.now()+ext;
    const uplo=`D:/AbidReactProjects/WebTechProject/client/newsapp/src/asset/images/${fileNa}`;
    if(file.mimetype==="image/jpg"||file.mimetype==="image/jpeg"||file.mimetype==="image/png"||file.mimetype==="image/webp")
{
    if(file.size<=2000000){
    file.mv(uplo,err=>{
        if(err){
            console.log(err);
       return {imageErrors:err}
        }
        
    });
}
else
imageErrors="File size needs to be smaller than 2mb"

}
 else
imageErrors="Only jpg, jpeg, and png format allowed"

return {imageErrors:imageErrors,fileNa};
}
module.exports=imageUpload;