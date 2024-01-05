// const bcrypt = require("bcrypt");

// async function hashPassword(plainPassword) {
//     const hash = await bcrypt.hash(plainPassword,10);
    
// }
import * as bcrypt from "bcrypt";

export class Auth {
    hashPassword(plainPassword:string) {
        const hash = bcrypt.hash(plainPassword,10);
        return hash;
    }

    async comparePassword(plainPassword,hash):Promise<any> {
        const res = await bcrypt.compare(plainPassword,hash);
        return res;
    }
}
export default new Auth();