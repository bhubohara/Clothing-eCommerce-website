import bycrpt from 'bcrypt';

export const hashPassword = async (password)=>{
    try {
        const saltRound =10;
        const hashedPassword = await bycrpt.hash(password,saltRound)
        return hashedPassword
        
    } catch (error) {
        console.log(error)
        
    }
}

export const comparePassword = async (password,hashedPassword)=>{
    return bycrpt.compare(password,hashedPassword);
}