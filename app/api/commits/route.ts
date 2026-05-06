import { NextResponse } from 'next/server'
import { fetchRecentCommits } from '@/lib/github'

export async function GET() {
  try {
    const commits = await fetchRecentCommits()
    return NextResponse.json(commits)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}
