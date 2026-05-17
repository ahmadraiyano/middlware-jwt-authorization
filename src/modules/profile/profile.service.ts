import { pool } from "../../db"
import type { IProfile } from "./profile.interface"

const createProfileIntoDB = async(payload: any) =>{
    const {user_id, bio, address, phone, gender} = payload

    const user = await pool.query(`
        SELECT * FROM users WHERE id = $1
        `,[user_id])
    // console.log(user);
    if(user.rows.length === 0){
        throw new Error("user not exists")
    }

    const result = pool.query(`
        INSERT INTO profiles(user_id, bio, address, phone, gender) VALUES($1,$2,$3,$4,$5) RETURNING *
        `,[user_id, bio, address, phone, gender])
    return result

}

export const profileService = {
    createProfileIntoDB
}