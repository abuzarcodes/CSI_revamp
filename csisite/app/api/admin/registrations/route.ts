import { NextRequest, NextResponse } from 'next/server';
import { RegistrationFormData } from '@/types/events';

// Mock storage - in a real app, this would be a database
let mockRegistrations: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationFormData = await request.json();

    // Basic validation
    if (!body.eventId || !body.eventType) {
      return NextResponse.json(
        { error: 'Event ID and type are required' },
        { status: 400 }
      );
    }

    if (body.eventType === 'team_registration') {
      if (!body.members || body.members.length === 0) {
        return NextResponse.json(
          { error: 'Team members are required for team registration' },
          { status: 400 }
        );
      }

      // Validate each member
      for (const member of body.members) {
        if (!member.name || !member.registrationNumber || !member.year || !member.branch || !member.officialEmail || !member.phoneNumber) {
          return NextResponse.json(
            { error: 'All member fields are required' },
            { status: 400 }
          );
        }

        // Check for duplicate registration numbers or emails
        const existingRegistration = mockRegistrations.find(reg =>
          reg.eventType === 'team_registration' &&
          reg.members.some((m: any) =>
            m.registrationNumber === member.registrationNumber ||
            m.officialEmail === member.officialEmail
          )
        );

        if (existingRegistration) {
          return NextResponse.json(
            { error: 'One or more members have already registered for this event' },
            { status: 400 }
          );
        }
      }
    } else if (body.eventType === 'recruitment') {
      if (!body.participant) {
        return NextResponse.json(
          { error: 'Participant data is required for recruitment events' },
          { status: 400 }
        );
      }

      const participant = body.participant;
      if (!participant.name || !participant.registrationNumber || !participant.year || !participant.branch || !participant.officialEmail || !participant.phoneNumber) {
        return NextResponse.json(
          { error: 'All participant fields are required' },
          { status: 400 }
        );
      }

      // Check for duplicate registration
      const existingRegistration = mockRegistrations.find(reg =>
        reg.eventType === 'recruitment' &&
        reg.participant.registrationNumber === participant.registrationNumber
      );

      if (existingRegistration) {
        return NextResponse.json(
          { error: 'You have already registered for this event' },
          { status: 400 }
        );
      }
    }

    // Create new registration
    const registration = {
      _id: Date.now().toString(),
      event: body.eventId,
      eventType: body.eventType,
      members: body.members,
      participant: body.participant,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    mockRegistrations.push(registration);

    console.log('Registration created:', registration);

    return NextResponse.json(
      { message: 'Registration successful', registration },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would fetch from a database with proper filtering
    return NextResponse.json({
      registrations: mockRegistrations,
      total: mockRegistrations.length
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}