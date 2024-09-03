
const errormessage = (res,stat,messa)=>{
    return res.status(stat).json({
        message:messa
    })
}
export default errormessage