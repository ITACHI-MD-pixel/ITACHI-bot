const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUhMYUp5aW9BUUFyTkcyTTJXcXpnM2dGRkNKTkRPZzRsb2dGQ1lQOU9XWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVVoMy9xWDFUVFZ4VW1kMzhsbFgxVVpubEo3WldweW9IcVkxRDlQNktGVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S1Q4MHNnUVFGVlJnTlJ2MTZWM0JGVEl5NzVPU1hrUlcwNC8wODFqT2xvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrbGdYK3lPbHRMNTR6U3VhQzN3Y0NXMFFTMjdBdCtTMTU0YTd4MEtWbVJzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLRDdqYVY4cEtmSHpyMU5ob09pZnhPRkNmUnVFc1NoMHg5dGZnMHE4RXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IisxeDUrRTNsUm14MDFWRDduUVZWK0tKYWo4MGFZWExKOEZvNjNUTTZma3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia09YNHNzMVl6VkhPVmovT0ZUWmxUa3k3QVg3M2JmVEtjNk8rTVY1NTNubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREhPTU1ucXdXM2x4RkdmZ2NyRGJmRmhvVnR5MGJKZVZ2Qm93MXBTL2ttWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV4TzBYTE0wZ3lFYjY0ZFd1bll1WjBNRGo4TlR0UEdCWXBUOVA4RTBhdkViZXlYeWh6elpCSTdkbVI0MmRuWWtUVTgySEhZa0FOT3FOZXZ3OTJIWENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiJLa3VEcTNzYlFRUGE3Qlp6VzBTbVhMcUJsU0Q3M1dFWnFPOVRnWFFPV1k0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVOHVmZjZraFRBbWRyUUtmTG1MVDRBIiwicGhvbmVJZCI6IjkzOTZmZmUwLWFjZDUtNDE3My04NGI4LWExZTdhMzAxMTE5YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxblozMUVFMHl6YzArYzlsRnI2NjlyVWRqWU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVNIOERDOGR1MGNpWHVGYnRyUzZYTDlaNlpzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllQTEg3TFdLIiwibWUiOnsiaWQiOiIyMzQ4MTMyMjkwMjA3OjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlVDSElIQSBJVEFDSEkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0liOHU0WUJFTXJNOHJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikx2dndsRUZkRGt1TGZna3l1em8xZ205RnZyQkFwMzhNZWtVWGdDaUdXQ2s9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFZaHh1ZW5COTdxdXgwdmV5UkJUNjlaZ3FSUE1yRDVCN3cxREVKWW9USnRyM1Z5S3ZYZHl1ZW9Pc1JHSnJvNWh1RTczRFFkOHNJR3pta29Eb1RJUkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSRVdsVjBMbk5vSGFZOWZhQ3paUXB5Q3JUOGRYd0s0dEtMU3dGTmc2ZWdOVTBPazUwWThwajc5cW1GM2pUTnNDS3cxem0zSXZNUG8wNDNwOUxPMUtCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMzIyOTAyMDc6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUzc3OEpSQlhRNUxpMzRKTXJzNk5ZSnZSYjZ3UUtkL0RIcEZGNEFvaGxncCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzYzOTM4MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFBM1cifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ITACHI-MD-pixel",
    NUMERO_OWNER : process.env.OWNER_NUM || "2348132290207",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/d72a4c7f62821f1e72540.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
