import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, note, attend } = body;

    // Log the RSVP submission (replace with database storage as needed)
    console.log("RSVP received:", { name, contact, note, attend });

    // TODO: Connect to a database (e.g., Prisma + PostgreSQL) to persist RSVPs
    // Example:
    // await prisma.customer.create({ data: { name, contact, note } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process RSVP" },
      { status: 500 }
    );
  }
}
