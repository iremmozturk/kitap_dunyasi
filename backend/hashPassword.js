const bcrypt = require('bcrypt');

const hashPassword = async () => {
    const password = '12345'; // Şifrenizi buraya yazın
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
};

hashPassword();
