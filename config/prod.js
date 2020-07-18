module.exports = {
    mongoURI: process.env.MONGO_URI,
    gmailEmail: process.env.GMAIL_EMAIL,
    gmailPassword: process.env.GMAIL_PASSWORD,
    saltedRounds: 10,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
}