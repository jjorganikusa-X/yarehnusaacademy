import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    // Get specific story by ID
    if (id) {
      const story = await sql`
        SELECT * FROM social_stories
        WHERE id = ${id}
      `;
      
      if (story.length === 0) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
      }
      
      return NextResponse.json(story[0]);
    }

    // Get all stories or filter by category
    let stories;
    if (category && category !== 'Semua') {
      stories = await sql`
        SELECT * FROM social_stories
        WHERE category = ${category}
        ORDER BY is_featured DESC, created_at DESC
      `;
    } else {
      stories = await sql`
        SELECT * FROM social_stories
        ORDER BY is_featured DESC, created_at DESC
      `;
    }

    return NextResponse.json(stories);
  } catch (error: any) {
    console.error('Error fetching social stories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      title_en, 
      title_ja,
      category,
      category_en,
      category_ja,
      proverb,
      icon,
      color,
      description,
      description_en,
      description_ja,
      story_content,
      story_content_en,
      story_content_ja,
      image_url,
      is_featured
    } = body;

    const result = await sql`
      INSERT INTO social_stories (
        title, title_en, title_ja,
        category, category_en, category_ja,
        proverb, icon, color,
        description, description_en, description_ja,
        story_content, story_content_en, story_content_ja,
        image_url, is_featured
      ) VALUES (
        ${title}, ${title_en}, ${title_ja},
        ${category}, ${category_en}, ${category_ja},
        ${proverb}, ${icon}, ${color},
        ${description}, ${description_en}, ${description_ja},
        ${story_content}, ${story_content_en}, ${story_content_ja},
        ${image_url}, ${is_featured || false}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating social story:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
