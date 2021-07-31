const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './whatsapp-session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: true }, session: sessionCfg });

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small:true})
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    try {
        if (msg.body == '/start') {
            msg.reply('Iyaa gimana ? ada yang bisa di bantu hehe');
        }
        if (msg.body == '/gas') {
            msg.reply('Gaskeun pasang jaring di bake wkwkwk');
        }
        if (msg.body == '/reward') {
            msg.reply('anda belum memiliki apapun !');
        }
        if (msg.body == '/hai') {
            msg.reply('Haloo');
        }
        if (msg.body == 'p' || msg.body == 'P') {
            msg.reply('ini adalah bot idamtech, silahkan sampaikan pesan anda ? terimakasih');
        }
    } catch (err) {
    
    }
});

client.initialize();
