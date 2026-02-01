'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, CNPJInput } from '@/components/ui';
import { usersApi, organizationsApi } from '@/lib/api';
import type { CreateUserData } from '@/types/user';
import type { CreateOrganizationData } from '@/types/organization';
import type { User, Organization } from '@/types';

type Step = 'user' | 'organization';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  // User form state
  const [userData, setUserData] = useState<CreateUserData>({
    email: '',
    name: '',
  });

  // Organization form state
  const [organizationData, setOrganizationData] = useState<CreateOrganizationData>({
    name: '',
    document: '',
  });

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await usersApi.create(userData);
      setCreatedUser(user);
      setStep('organization');
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleOrganizationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Prepare organization data (only include document if it has value)
      const orgData: CreateOrganizationData = {
        name: organizationData.name,
        ...(organizationData.document && organizationData.document.length > 0
          ? { document: organizationData.document }
          : {}),
      };

      // Create organization
      const organization = await organizationsApi.create(orgData);

      // Update user with organization ID
      if (createdUser) {
        await usersApi.update(createdUser.id, {
          organizationId: organization.id,
        });
      }

      // Redirect to success or home page
      router.push('/register/success');
    } catch (err: any) {
      setError(err.message || 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step {step === 'user' ? '1' : '2'} of 2: {step === 'user' ? 'User Information' : 'Organization Information'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {step === 'user' ? (
          <form onSubmit={handleUserSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="user@example.com"
                required
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                disabled={loading}
              />

              <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={userData.name || ''}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                disabled={loading}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating...' : 'Continue to Organization'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOrganizationSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                id="organizationName"
                type="text"
                label="Organization Name"
                placeholder="Acme Corp"
                required
                value={organizationData.name}
                onChange={(e) =>
                  setOrganizationData({ ...organizationData, name: e.target.value })
                }
                disabled={loading}
              />

              <CNPJInput
                id="organizationDocument"
                label="CNPJ (Optional)"
                placeholder="00.000.000/0000-00"
                value={organizationData.document || ''}
                onChange={(value) =>
                  setOrganizationData({ ...organizationData, document: value || undefined })
                }
                disabled={loading}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('user')}
                disabled={loading}
                className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating...' : 'Complete Registration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

