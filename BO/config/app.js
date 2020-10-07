exports.app = {
    fileStorageDir: 'BO/tmp'
}

exports.db = {
    dbConnection: 'mongodb+srv',
    dbUsername: 'hvs',
    dbPassword: 'hungvietsolution',
    dbName: 'dbFile',
    dbHost: 'cluster0.vgva4.mongodb.net'
}

exports.jwt = {
    accessTokenLife: process.env.ACCESS_TOKEN_LIFE || '1h',
    refreshTokenLife: process.env.REFRESH_TOKEN_LIFE || '365d',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'hv-solution-dev-team-access-token-secret@v1.0',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'hv-solution-dev-team-refresh-token-secret@v1.0'
}
