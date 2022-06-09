const cache=require("node-cache");

const cac=new cache();

const cacheSet=(req,res,next)=>{
    if(req.method!=="GET"){
        console.log("Cache Miss")
    next();
    }
    else 
    {
        const cachedResponse=cac.get(req.path);
        console.log(cachedResponse);
        if(cachedResponse)
        {
            res.status(200).send(cachedResponse);
        }
        else
        next();
    }

}

module.exports={cacheSet,cac};