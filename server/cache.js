const cache=require("node-cache");

const cac=new cache();

const cacheSet=(req,res,next)=>{
    if(req.method!=="GET"){
        
    next();
    }
    else 
    {
        const cachedResponse=cac.get(req.path);
     
        if(cachedResponse)
        {
            res.status(200).send(cachedResponse);
        }
        else
        next();
    }

}

module.exports={cacheSet,cac};