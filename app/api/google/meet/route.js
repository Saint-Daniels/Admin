import { google } from 'googleapis';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

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
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(7),
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
      conferenceDataVersion: 1,
    });

    return NextResponse.json({
      meetLink: response.data.hangoutLink,
      event: response.data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 