const successmessage = (res,stat,messa,data)=>{
    return res.status(stat).json({
        message:messa,
        datas:data
    })
}
export default successmessage