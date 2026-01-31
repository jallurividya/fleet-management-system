import { supabse } from "../config/supabaseConfig.js";
export async function checkDBConnection() {
    try{
        const { error } = await supabse.from("users").select().limit(1);
        if(error) throw error
        console.log("Database connected successfully");
        return true;
    }
    catch(error){
        console.log("Database Connection failed", error.message);
        return false;
    }
}