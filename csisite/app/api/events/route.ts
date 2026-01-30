import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@/types/events';

// Mock data for events - in a real app, this would come from a database
const mockEvents: Event[] = [
  {
    _id: '1',
    name: 'CSI Recruitment Drive 2026',
    date: '2026-02-15',
    isOpen: true,
    eventType: 'recruitment',
    teams: [
      {
        id: 'web-dev',
        name: 'Web Development',
        description: 'Build amazing web applications',
        maxMembers: 50,
        questions: [
          {
            id: 'web-exp',
            type: 'textarea',
            question: 'Describe your experience with web development',
            required: true,
            placeholder: 'Tell us about your projects...',
            maxLength: 500
          },
          {
            id: 'tech-stack',
            type: 'mcq',
            question: 'Which technologies are you familiar with?',
            required: true,
            options: ['React', 'Vue', 'Angular', 'Next.js', 'Express', 'Django', 'Flask']
          }
        ]
      },
      {
        id: 'ai-ml',
        name: 'AI & Machine Learning',
        description: 'Explore the world of artificial intelligence',
        maxMembers: 30,
        questions: [
          {
            id: 'ai-exp',
            type: 'textarea',
            question: 'What AI/ML projects have you worked on?',
            required: true,
            placeholder: 'Describe your experience...',
            maxLength: 500
          }
        ]
      },
      {
        id: 'cyber-security',
        name: 'Cyber Security',
        description: 'Learn about cybersecurity and ethical hacking',
        maxMembers: 25,
        questions: [
          {
            id: 'security-interest',
            type: 'textarea',
            question: 'Why are you interested in cybersecurity?',
            required: true,
            placeholder: 'Explain your interest...',
            maxLength: 300
          }
        ]
      }
    ],
    commonQuestions: [
      {
        id: 'motivation',
        type: 'textarea',
        question: 'What motivates you to join CSI?',
        required: true,
        placeholder: 'Tell us what drives you...',
        maxLength: 400
      },
      {
        id: 'commitment',
        type: 'mcq',
        question: 'How much time can you commit weekly?',
        required: true,
        options: ['5-10 hours', '10-15 hours', '15-20 hours', '20+ hours']
      }
    ],
    allowMultipleTeamSelection: true
  },
  {
    _id: '2',
    name: 'Hackathon 2026',
    date: '2026-03-20',
    isOpen: true,
    eventType: 'team_registration',
    teamSize: 4,
  },
  {
    _id: '3',
    name: 'Workshop Series',
    date: '2026-04-10',
    isOpen: false,
    eventType: 'team_registration',
    teamSize: 2,
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would fetch from a database
    // For now, return mock data
    return NextResponse.json({
      events: mockEvents.filter(event => event.isOpen)
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}