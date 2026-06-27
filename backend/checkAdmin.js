require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const admins = await Admin.find({});
        if (admins.length > 0) {
            console.log('Admins found in database:', admins.map(a => a.username));
        } else {
            const adminUser = process.env.ADMIN_USERNAME;
            const adminPass = process.env.ADMIN_PASSWORD;

            console.log('No admins found in the database. Creating default admin...');
            const admin = new Admin({
                username: adminUser,
                password: adminPass
            });
            await admin.save();
            console.log(`Default admin created: username "${adminUser}" (password hidden for security)`);
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
