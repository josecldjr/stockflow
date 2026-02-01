import { NextRequest, NextResponse } from 'next/server'
import { createUserUseCase, getUsersUseCase } from '@/container'

// GET /api/users - List all users
export async function GET() {
  try {
    const users = await getUsersUseCase.execute()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, organizationId } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await createUserUseCase.execute({
      email,
      name,
      organizationId
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)

    if (error instanceof Error) {
      // Handle business logic errors
      if (error.message === 'Invalid email format') {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }

      if (error.message === 'User with this email already exists') {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
