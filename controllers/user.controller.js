import { supabse } from "../config/supabaseConfig.js";
export const signupUser = async (req,res)=>{
    const {name, email, password, role} = req.body
    if(!name || !email || !password || !role){
        return res.status(400).json({message:"All fields are required"})
    }
    const {data:existingUser} = await supabse.from("users").select("*").eq("email",email).single()
    if(existingUser)
        return res.status(407).json({message:"Email already redistered"})
    const {data,error}=await supabse.from("users").insert([{name, email, password, role}])
    if(error)
        return res.status(500).json({error: error.message})
    res.status(200).json({message:"user registration success", data: data})
}