import { Resend } from 'resend';

const recipients = ['changdae.kim@bearlabs.kr', 'it09kim@gmail.com'];

function getValue(value, maxLength = 1000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = getValue(body.name, 100);
  const company = getValue(body.company, 160);
  const phone = getValue(body.phone, 100);
  const message = getValue(body.message, 5000);

  if (!name || !company || !phone) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Bots commonly fill fields that are hidden from human visitors.
  if (body.website) return Response.json({ ok: true });

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: 'Email service is not configured' }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `[BearLabs 문의] ${company} - ${name}`.replace(/[\r\n]/g, ' ');
  let error;

  try {
    ({ error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'BearLabs 문의 <contact@bearlabs.kr>',
      to: recipients,
      subject,
      text: [
        'BearLabs 랜딩페이지 문의',
        '',
        `이름: ${name}`,
        `회사명: ${company}`,
        `연락처: ${phone}`,
        '',
        '문의 내용:',
        message || '(내용 없음)',
      ].join('\n'),
    }));
  } catch (sendError) {
    console.error('Failed to send contact email:', sendError);
    return Response.json({ error: 'Failed to send email' }, { status: 502 });
  }

  if (error) {
    console.error('Failed to send contact email:', error);
    return Response.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
