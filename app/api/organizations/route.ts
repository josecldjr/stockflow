import { NextRequest, NextResponse } from 'next/server'
import { createOrganizationUseCase } from '@/container'

// POST /api/organizations - Create a new organization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, document } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const organization = await createOrganizationUseCase.execute({
      name,
      document
    })

    return NextResponse.json(organization, { status: 201 })
  } catch (error) {
    console.error('Error creating organization:', error)

    if (error instanceof Error) {
      // Handle business logic errors
      if (error.message === 'Organization name is required') {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        )
      }

      if (error.message === 'Organization with this name already exists') {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        )
      }

      if (error.message === 'Organization with this document already exists') {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    )
  }
}

