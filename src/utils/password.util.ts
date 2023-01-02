import bcrypt from 'bcrypt';


export const hashPassword = async (plainPassword: string | Buffer) => {
    return bcrypt.hash(plainPassword, 5);
};

export const comparePasswords = async (hashedPassword: string, plainPassword: string | Buffer) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

export function generateRandomOTP(length = 4) {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
