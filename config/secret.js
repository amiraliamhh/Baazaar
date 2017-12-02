module.exports = {
    database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/baazaar',
    port: process.env.PORT || 3000,
    secret: process.env.SECRET || '120u10eoiahwd8awd03dqh03q',
    adminUserName: process.env.ADMINUSERNAME || 'baazaar',
    adminPassword: process.env.ADMINPASSWORD || 'C7255272D40C3FAF023AF8DF9CD15E6213266127D7E43B1BA1958ED80771C768'
}