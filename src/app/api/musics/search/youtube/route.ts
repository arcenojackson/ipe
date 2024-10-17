import { youtube, youtube_v3 } from '@googleapis/youtube'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const client = youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  })
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')
  console.log('query', query)
  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 })
  }
  try {
    const videos = await searchVideos(client, query)
    return NextResponse.json({ message: 'OK', data: videos }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 })
  }
}

const searchVideos = async (client: youtube_v3.Youtube, query: string) => {
  try {
    const response = await client.search.list({
      part: ['id', 'snippet'],
      q: query,
      type: ['video'],
      maxResults: 5
    })

    return response.data.items?.map((item) => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      image: item.snippet?.thumbnails?.default?.url
    }))
  } catch (error) {
    console.error('Error searching YouTube videos:', error)
    throw error
  }
}
