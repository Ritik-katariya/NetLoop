import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const clientUrl = process.env.NODE_ENV === "development" ? process.env.CLIENT__LOCAL_URL : process.env.CLIENT_URL

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    clientUrl: clientUrl,
    emailPass: process.env.EMAIL_PASS,
    adminEmail: process.env.ADMIN_EMAIL,
    superAdminEmail: process.env.SUPER_ADMIN_EMAIL,
    gmail_app_Email: process.env.GMAIL_APP_EMAIL,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    },
    CLIENT_URL: process.env.CLIENT_URL
    
}