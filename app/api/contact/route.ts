import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek.' }, { status: 400 })
  }

  const { name, email, message } = body as Record<string, unknown>

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Naam is verplicht.' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'E-mailadres is verplicht.' }, { status: 400 })
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Bericht is verplicht.' }, { status: 400 })
  }

  const to = process.env.CONTACT_FORM_TO_EMAIL
  if (!to) {
    console.error('CONTACT_FORM_TO_EMAIL is not set')
    return NextResponse.json({ error: 'Serverfout.' }, { status: 500 })
  }

  try {
    await resend.emails.send({
      from: 'Contactformulier <noreply@resend.dev>',
      to,
      replyTo: email.trim(),
      subject: `Nieuw bericht van ${name.trim()}`,
      text: `Naam: ${name.trim()}\nE-mail: ${email.trim()}\n\nBericht:\n${message.trim()}`,
      html: `
        <h2>Nieuw contactformulier bericht</h2>
        <p><strong>Naam:</strong> ${name.trim()}</p>
        <p><strong>E-mail:</strong> ${email.trim()}</p>
        <hr />
        <p>${message.trim().replace(/\n/g, '<br />')}</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Versturen mislukt. Probeer het later opnieuw.' }, { status: 500 })
  }
}
