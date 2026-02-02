# React Hooks

Custom React hooks for common functionality.

## useLocalStorage

Hook for managing localStorage with React state synchronization.

### Usage

```tsx
import { useLocalStorage } from '@/hooks';

function MyComponent() {
  const [value, setValue, removeValue] = useLocalStorage('myKey', 'defaultValue');

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue('newValue')}>Set Value</button>
      <button onClick={() => setValue((prev) => prev + ' updated')}>
        Update Value
      </button>
      <button onClick={removeValue}>Remove Value</button>
    </div>
  );
}
```

### With Objects

```tsx
import { useLocalStorage } from '@/hooks';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
}

function Preferences() {
  const [prefs, setPrefs] = useLocalStorage<UserPreferences>('preferences', {
    theme: 'light',
    language: 'en',
  });

  return (
    <div>
      <button
        onClick={() =>
          setPrefs({ ...prefs, theme: prefs.theme === 'light' ? 'dark' : 'light' })
        }
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

### Features

- ✅ Type-safe localStorage operations
- ✅ Automatic JSON serialization/deserialization
- ✅ Synchronizes across browser tabs/windows
- ✅ SSR-safe (handles server-side rendering)
- ✅ Error handling with console warnings

## useApi

Hook for managing API calls with loading and error states.

### Usage

```tsx
import { useApi } from '@/hooks';
import { usersApi } from '@/lib/api/users';

function UsersList() {
  const { data, loading, error, execute, reset } = useApi(usersApi.getAll);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <button onClick={execute}>Refresh</button>
      <button onClick={reset}>Reset</button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### With Parameters

```tsx
import { useApi } from '@/hooks';
import { usersApi } from '@/lib/api/users';

function UserDetails({ userId }: { userId: string }) {
  const { data, loading, error, execute } = useApi(usersApi.getById);

  useEffect(() => {
    execute(userId);
  }, [execute, userId]);

  // ... rest of component
}
```

### Features

- ✅ Loading state management
- ✅ Error state management
- ✅ Data state management
- ✅ Reset functionality
- ✅ Type-safe API calls


