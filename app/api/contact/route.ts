import { NextRequest, NextResponse } from 'next/server';

const CF7_BASE = 'https://sentimentai.nexatestwp.com/wp-json/contact-form-7/v1/contact-forms';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formId, fields } = body;

    if (!formId || !fields) {
      return NextResponse.json({ status: 'error', message: 'Missing form data' }, { status: 400 });
    }

    const formData = new FormData();
    formData.append('_wpcf7', String(formId));
    formData.append('_wpcf7_version', '6.1.5');
    formData.append('_wpcf7_locale', 'en_US');
    formData.append('_wpcf7_unit_tag', `wpcf7-f${formId}-o1`);

    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value as string);
    }

    const res = await fetch(`${CF7_BASE}/${formId}/feedback`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ status: 'error', message: 'Submission failed' }, { status: 500 });
  }
}
