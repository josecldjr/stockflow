# API Client

Client library for making API calls to the backend.

## Usage

### Basic API Client

The main API client provides methods for HTTP requests:

```tsx
import { api } from '@/lib/api';

// GET request
const users = await api.get('/api/users');

// POST request
const newUser = await api.post('/api/users', {
  email: 'user@example.com',
  name: 'John Doe',
});

// PUT request
const updatedUser = await api.put('/api/users/123', {
  name: 'Jane Doe',
});

// DELETE request
await api.delete('/api/users/123');
```

### Specific API Modules

Use the specific API modules for type-safe operations:

```tsx
import { usersApi } from '@/lib/api/users';
import { organizationsApi } from '@/lib/api/organizations';

// Users API
const users = await usersApi.getAll();
const user = await usersApi.getById('123');
const newUser = await usersApi.create({
  email: 'user@example.com',
  name: 'John Doe',
});
await usersApi.update('123', { name: 'Jane Doe' });
await usersApi.delete('123');

// Organizations API
const orgs = await organizationsApi.getAll();
const org = await organizationsApi.getById('123');
const newOrg = await organizationsApi.create({ name: 'Acme Corp' });
await organizationsApi.update('123', { name: 'New Name' });
await organizationsApi.delete('123');
```

### Error Handling

The API client throws `ApiError` objects:

```tsx
import { api, type ApiError } from '@/lib/api';

try {
  const users = await api.get('/api/users');
} catch (error) {
  const apiError = error as ApiError;
  console.error('Error:', apiError.message);
  console.error('Status:', apiError.status);
  console.error('Details:', apiError.details);
}
```

### Using with React Hook

Use the `useApi` hook for React components:

```tsx
import { useApi } from '@/hooks';
import { usersApi } from '@/lib/api/users';

function UsersList() {
  const { data, loading, error, execute } = useApi(usersApi.getAll);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## API Endpoints

The `apiEndpoints` object provides centralized endpoint definitions:

```tsx
import { apiEndpoints } from '@/lib/api';

// Users endpoints
apiEndpoints.users.list; // '/api/users'
apiEndpoints.users.create; // '/api/users'
apiEndpoints.users.get('123'); // '/api/users/123'
apiEndpoints.users.update('123'); // '/api/users/123'
apiEndpoints.users.delete('123'); // '/api/users/123'

// Organizations endpoints
apiEndpoints.organizations.list; // '/api/organizations'
// ... etc
```

## Features

- ✅ Type-safe API calls
- ✅ Automatic JSON serialization
- ✅ Error handling with typed errors
- ✅ Query parameter support
- ✅ Centralized endpoint management
- ✅ Works with Next.js API routes


