

const login = async (req,res)=>{
    res.send('this is login / register')
}

const dashboard = async (req,res)=>{
    const randNum = Math.floor(Math.random()*100) + 1
    res.status(200).json({msg:'this is auth user',secret:'your number is : ' + randNum})
}

module.exports = {login,dashboard}