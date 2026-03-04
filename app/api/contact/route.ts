import { NextRequest, NextResponse } from 'next/server';

const CONTACT_FORM_URL = 'https://sentimentai.nexatestwp.com/wp-json/custom/v1/contact-form';

const FORM_FIELDS = ['full-name', 'company', 'role', 'your-email', 'phone', 'your-message'] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fields = body?.fields ?? body;

    if (!fields || typeof fields !== 'object') {
      return NextResponse.json({ status: 'error', message: 'Missing form data' }, { status: 400 });
    }

    const payload: Record<string, string> = {};
    for (const key of FORM_FIELDS) {
      const value = fields[key];
      payload[key] = typeof value === 'string' ? value : '';
    }

    const res = await fetch(CONTACT_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: { status?: string; success?: boolean; message?: string } = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: res.ok ? undefined : 'Submission failed' };
    }

    if (!res.ok) {
      const message = data?.message || 'Submission failed';
      return NextResponse.json({ status: 'error', message }, { status: 200 });
    }
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Submission failed';
    return NextResponse.json({ status: 'error', message }, { status: 200 });
  }
}
