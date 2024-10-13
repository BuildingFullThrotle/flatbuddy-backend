import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

enum Preference {
  NIGHT_OWL = "NIGHT_OWL",
  EARLY_BIRD = "EARLY_BIRD",
  QUIET = "QUIET",
  SOCIAL = "SOCIAL",
  CLEAN = "CLEAN",
  STUDIOUS = "STUDIOUS",
  PET_FRIENDLY = "PET_FRIENDLY",
  NON_SMOKER = "NON_SMOKER",
  VEGETARIAN = "VEGETARIAN",
  FITNESS_ENTHUSIAST = "FITNESS_ENTHUSIAST"
}

enum Amenity {
  FRIDGE = "FRIDGE",
  WASHING_MACHINE = "WASHING_MACHINE",
  AC = "AC",
  PARKING = "PARKING",
  TV = "TV",
  INTERNET = "INTERNET",
  ELEVATOR = "ELEVATOR",
  GYM = "GYM",
  LAUNDRY_SERVICE = "LAUNDRY_SERVICE",
  SAUNA = "SAUNA",
  POOL = "POOL"
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const {
      userId,
      title,
      description,
      location,
      photos,
      rent,
      lookingFor,
      occupancyType,
      features,
      amenities,
      preferences
    } = body;

    // Validate required fields
    if (!userId || !title || !description || !location || !rent || !lookingFor || !occupancyType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const validPreferences = preferences.every((pref: string) => 
      Object.values(Preference).includes(pref as Preference)
    );

    if (!validPreferences) {
      return NextResponse.json({ error: 'Invalid preferences' }, { status: 400 });
    }

    // Validate amenities
    const validAmenities = amenities.every((amenity: string) => 
      Object.values(Amenity).includes(amenity as Amenity)
    );

    if (!validAmenities) {
      return NextResponse.json({ error: 'Invalid amenities' }, { status: 400 });
    }

    // Create new ad entry
    const newAd = await prisma.ad.create({
      data: {
        userId,
        title,
        description,
        location,
        photos: photos || [],
        rent,
        lookingFor,
        occupancyType,
        features: features || [],
        amenities: amenities || [],
        preferences: preferences || [],
      },
    });

    return NextResponse.json(newAd, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}