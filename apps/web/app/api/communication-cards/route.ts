import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

// GET all cards for a user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const cards = await sql`
      SELECT * FROM communication_cards 
      WHERE user_id = ${userId} 
      ORDER BY position ASC, id ASC
    `;

    return NextResponse.json({ cards });
  } catch (error: any) {
    console.error('Error fetching cards:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create new card
export async function POST(request: NextRequest) {
  try {
    const { userId, label, labelEn, labelJa, icon, color, category } = await request.json();

    if (!userId || !label || !icon || !color) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the max position for this user
    const maxPosition = await sql`
      SELECT COALESCE(MAX(position), 0) as max_pos 
      FROM communication_cards 
      WHERE user_id = ${userId}
    `;

    const newPosition = (maxPosition[0]?.max_pos || 0) + 1;

    const result = await sql`
      INSERT INTO communication_cards (user_id, label, label_en, label_ja, icon, color, category, position)
      VALUES (${userId}, ${label}, ${labelEn || null}, ${labelJa || null}, ${icon}, ${color}, ${category || 'Umum'}, ${newPosition})
      RETURNING *
    `;

    return NextResponse.json({ card: result[0] });
  } catch (error: any) {
    console.error('Error creating card:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE card
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    await sql`DELETE FROM communication_cards WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting card:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update card
export async function PUT(request: NextRequest) {
  try {
    const { id, label, labelEn, labelJa, icon, color, category } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    const result = await sql`
      UPDATE communication_cards 
      SET 
        label = COALESCE(${label}, label),
        label_en = COALESCE(${labelEn}, label_en),
        label_ja = COALESCE(${labelJa}, label_ja),
        icon = COALESCE(${icon}, icon),
        color = COALESCE(${color}, color),
        category = COALESCE(${category}, category)
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ card: result[0] });
  } catch (error: any) {
    console.error('Error updating card:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
