import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_CONVERSION_API_ACCESS_TOKEN;

interface ConversionData {
  eventName: string;
  eventSourceUrl: string;
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbc?: string; // Facebook click ID
    fbp?: string; // Facebook browser ID
  };
  customData?: Record<string, any>;
}

// Hash function for PII data
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { eventName, eventSourceUrl, userData, customData }: ConversionData = await request.json();

    if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
      console.warn('Meta Conversion API credentials not configured');
      return NextResponse.json(
        { error: 'Meta Conversion API not configured' },
        { status: 500 }
      );
    }

    // Hash PII data for privacy compliance
    const hashedUserData: any = {};
    
    if (userData.email) {
      hashedUserData.em = hashData(userData.email);
    }
    if (userData.phone) {
      hashedUserData.ph = hashData(userData.phone.replace(/[^0-9]/g, ''));
    }
    if (userData.firstName) {
      hashedUserData.fn = hashData(userData.firstName);
    }
    if (userData.lastName) {
      hashedUserData.ln = hashData(userData.lastName);
    }
    
    // Include non-PII data as-is
    if (userData.clientIpAddress) {
      hashedUserData.client_ip_address = userData.clientIpAddress;
    }
    if (userData.clientUserAgent) {
      hashedUserData.client_user_agent = userData.clientUserAgent;
    }
    if (userData.fbc) {
      hashedUserData.fbc = userData.fbc;
    }
    if (userData.fbp) {
      hashedUserData.fbp = userData.fbp;
    }

    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: eventSourceUrl,
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: customData || {},
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          access_token: META_ACCESS_TOKEN,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Meta Conversion API error:', error);
      return NextResponse.json(
        { error: 'Failed to send conversion event' },
        { status: 500 }
      );
    }

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Conversion event sent successfully',
      result,
    });

  } catch (error) {
    console.error('Meta Conversion API submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}