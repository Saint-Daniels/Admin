import { google } from 'googleapis';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const calendar = google.calendar({
      version: 'v3',
      auth: session.accessToken,
    });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return NextResponse.json(response.data.items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const calendar = google.calendar({
      version: 'v3',
      auth: session.accessToken,
    });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: body.summary,
        description: body.description,
        start: {
          dateTime: body.startTime,
          timeZone: 'UTC',
        },
        end: {
          dateTime: body.endTime,
          timeZone: 'UTC',
        },
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 