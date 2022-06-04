
export default function validatePostData({title,desc,file},){
    let errors={};
    if(title.length<20)
    {
        errors.title="Title needs to be more than 20characters"
    }
    if(desc.length<20)
    {
        errors.desc="Description needs to be more than 100characters"
    }
    if(file===null)
    {
        errors.image="Image needs to be uploaded";
    }
   // console.log("Abid");
    return errors;
}