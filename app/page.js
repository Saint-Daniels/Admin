'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const GOOGLE_CLIENT_ID = '9708979901-gtmh3fdup5sj5u10146b32je9fqan2f3.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventForm, setEventForm] = useState({
    summary: '',
    description: '',
    start: '',
    end: '',
    location: '',
    attendees: '', // comma-separated emails
  });
  const [selectedDate, setSelectedDate] = useState(() => new Date('2025-05-01T00:00:00'));
  const [activeStartDate, setActiveStartDate] = useState(() => new Date('2025-05-01T00:00:00'));
  const [showDayModal, setShowDayModal] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);

  // Check authentication
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Load Google API script
  useEffect(() => {
    if (!isAuthenticated) return;
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.onload = () => setGapiLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [isAuthenticated]);

  // Initialize gapi and sign in
  useEffect(() => {
    if (!gapiLoaded) return;
    window.gapi.load('client:auth2', async () => {
      try {
        await window.gapi.client.init({
          apiKey: '', // Not needed for OAuth
          clientId: GOOGLE_CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: SCOPES,
        });
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
          await authInstance.signIn();
        }
        fetchEvents();
      } catch (err) {
        setError('Google Calendar initialization failed.');
      }
    });
    // eslint-disable-next-line
  }, [gapiLoaded]);

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      });
      setEvents(response.result.items || []);
    } catch (err) {
      setError('Failed to fetch events.');
    }
    setLoading(false);
  };

  // Open modal for new or edit event
  const handleOpenEventModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({
        summary: event.summary || '',
        description: event.description || '',
        start: event.start?.dateTime ? event.start.dateTime.slice(0, 16) : '',
        end: event.end?.dateTime ? event.end.dateTime.slice(0, 16) : '',
        location: event.location || '',
        attendees: event.attendees ? event.attendees.map(a => a.email).join(', ') : '',
      });
    } else {
      setEditingEvent(null);
      setEventForm({ summary: '', description: '', start: '', end: '', location: '', attendees: '' });
    }
    setShowEventModal(true);
  };

  // Handle form input
  const handleEventFormChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  // Add or update event
  const handleSaveEvent = async () => {
    setLoading(true);
    setError(null);
    try {
      const eventResource = {
        summary: eventForm.summary,
        description: eventForm.description,
        start: { dateTime: new Date(eventForm.start).toISOString() },
        end: { dateTime: new Date(eventForm.end).toISOString() },
        location: eventForm.location,
        attendees: eventForm.attendees
          ? eventForm.attendees.split(',').map(email => ({ email: email.trim() }))
          : [],
      };
      if (editingEvent) {
        await window.gapi.client.calendar.events.update({
          calendarId: 'primary',
          eventId: editingEvent.id,
          resource: eventResource,
        });
      } else {
        await window.gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: eventResource,
        });
      }
      setShowEventModal(false);
      setEditingEvent(null);
      setEventForm({ summary: '', description: '', start: '', end: '', location: '', attendees: '' });
      fetchEvents();
    } catch (err) {
      setError('Failed to save event.');
    }
    setLoading(false);
  };

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      await window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId,
      });
      fetchEvents();
    } catch (err) {
      setError('Failed to delete event.');
    }
    setLoading(false);
  };

  // Filter events for selected date
  const getEventsForDate = (date) => {
    const dayStr = date.toISOString().slice(0, 10);
    return events.filter(event => {
      const eventDate = event.start?.dateTime ? new Date(event.start.dateTime) : new Date(event.start?.date);
      return eventDate.toISOString().slice(0, 10) === dayStr;
    });
  };

  // Handle date click
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDayEvents(getEventsForDate(date));
    setShowDayModal(true);
  };

  // Add event for selected date
  const handleAddEventForDate = () => {
    setEditingEvent(null);
    setEventForm({
      summary: '',
      description: '',
      start: selectedDate.toISOString().slice(0, 16),
      end: selectedDate.toISOString().slice(0, 16),
      location: '',
      attendees: '',
    });
    setShowEventModal(true);
    setShowDayModal(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <h2 className="mb-0 flex-grow-1">Google Calendar</h2>
        <button className="btn btn-success ms-3" style={{ fontSize: '1.5rem', borderRadius: '50%' }} onClick={() => handleOpenEventModal()} title="Add Event">
          <FaPlus />
        </button>
      </div>
      <Calendar
        value={selectedDate}
        onClickDay={handleDateClick}
        calendarType="US"
        activeStartDate={activeStartDate}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const dayEvts = getEventsForDate(date);
            if (dayEvts.length > 0) {
              return <span className="badge bg-primary ms-1">{dayEvts.length}</span>;
            }
          }
          return null;
        }}
      />
      <div className="mt-4">
        <h4>Upcoming Events</h4>
        {loading && <div>Loading events...</div>}
        {error && <div className="text-danger mb-3">{error}</div>}
        {!loading && !error && events.length === 0 && <div>No upcoming events found.</div>}
        <ul className="list-group">
          {events.map(event => (
            <li key={event.id} className="list-group-item d-flex align-items-center justify-content-between">
              <div>
                <strong style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => handleOpenEventModal(event)}>
                  {event.summary || '(No Title)'}
                </strong>
                <br />
                {event.start?.dateTime ? new Date(event.start.dateTime).toLocaleString() : event.start?.date}
                {event.location && <div><small>{event.location}</small></div>}
              </div>
              <button className="btn btn-link text-danger p-0 ms-2" title="Delete Event" onClick={() => handleDeleteEvent(event.id)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Day Modal */}
      {showDayModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Events for {selectedDate.toLocaleDateString()}</h5>
                <button type="button" className="close" onClick={() => setShowDayModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {dayEvents.length === 0 ? (
                  <div>No events for this day.</div>
                ) : (
                  <ul className="list-group mb-3">
                    {dayEvents.map(event => (
                      <li key={event.id} className="list-group-item d-flex align-items-center justify-content-between">
                        <div>
                          <strong style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => { setShowDayModal(false); handleOpenEventModal(event); }}>
                            {event.summary || '(No Title)'}
                          </strong>
                          <br />
                          {event.start?.dateTime ? new Date(event.start.dateTime).toLocaleTimeString() : event.start?.date}
                        </div>
                        <button className="btn btn-link text-danger p-0 ms-2" title="Delete Event" onClick={() => { setShowDayModal(false); handleDeleteEvent(event.id); }}>
                          <FaTrash />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button className="btn btn-success" onClick={handleAddEventForDate}>+ Add Event for this Day</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Event Modal */}
      {showEventModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingEvent ? 'Edit Event' : 'Add Event'}</h5>
                <button type="button" className="close" onClick={() => setShowEventModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <label>Title</label>
                  <input type="text" className="form-control" name="summary" value={eventForm.summary} onChange={handleEventFormChange} />
                </div>
                <div className="form-group mb-2">
                  <label>Description</label>
                  <textarea className="form-control" name="description" value={eventForm.description} onChange={handleEventFormChange} />
                </div>
                <div className="form-group mb-2">
                  <label>Start</label>
                  <input type="datetime-local" className="form-control" name="start" value={eventForm.start} onChange={handleEventFormChange} />
                </div>
                <div className="form-group mb-2">
                  <label>End</label>
                  <input type="datetime-local" className="form-control" name="end" value={eventForm.end} onChange={handleEventFormChange} />
                </div>
                <div className="form-group mb-2">
                  <label>Location</label>
                  <input type="text" className="form-control" name="location" value={eventForm.location} onChange={handleEventFormChange} />
                </div>
                <div className="form-group mb-2">
                  <label>Attendees (comma-separated emails)</label>
                  <input type="text" className="form-control" name="attendees" value={eventForm.attendees} onChange={handleEventFormChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEventModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEvent} disabled={loading}>
                  {editingEvent ? 'Save Changes' : 'Add Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 