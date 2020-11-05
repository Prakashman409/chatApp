let formDataCheck=(checkData)=>{
       return typeof checkData==='string' && checkData.trim().length>0;
}

module.exports=formDataCheck();