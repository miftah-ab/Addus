import { NextRequest, NextResponse } from 'next/server'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    // 1. Instant Telegram Bot Notification
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (telegramBotToken && telegramChatId) {
      const telegramText =
        `🚀 <b>New Portfolio Inquiry!</b>\n\n` +
        `👤 <b>Name:</b> ${escapeHtml(trimmedName)}\n` +
        `📧 <b>Email:</b> ${escapeHtml(trimmedEmail)}\n\n` +
        `💬 <b>Message:</b>\n${escapeHtml(trimmedMessage)}`

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramText,
          parse_mode: 'HTML',
        }),
      }).catch(err => console.error('Telegram notification error:', err))
    }

    // 2. Save to Supabase (if configured)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/contact_submissions_addus`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      }).catch(err => console.error('Supabase save error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Contact route error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
