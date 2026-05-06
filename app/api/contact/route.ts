import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const res = await fetch(`${url}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
    })

    if (res.ok || res.status === 201) {
      return NextResponse.json({ success: true })
    }

    const err = await res.text()
    console.error('Supabase contact insert error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  } catch (e) {
    console.error('Contact route error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
