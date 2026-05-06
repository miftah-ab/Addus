import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const web3formsKey = process.env.WEB3FORMS_KEY

    // 1. Save to Supabase (always)
    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/contact_submissions_addus`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      }).catch(err => console.error('Supabase save failed:', err))
    }

    // 2. Send email notification via Web3Forms (free — 250/month, no credit card)
    //    Get your free key at https://web3forms.com
    if (web3formsKey) {
      const emailRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New contact from ${name} — Addus`,
          from_name: 'Addus Website',
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })
      const emailData = await emailRes.json()
      if (!emailData.success) {
        console.error('Web3Forms error:', emailData)
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Contact route error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
