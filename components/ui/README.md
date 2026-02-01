# UI Components

Reusable UI components built with React, TypeScript, and Tailwind CSS.

## Components

### Input
Basic text input component with label, error, and helper text support.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Name"
  placeholder="Enter your name"
  required
  error={errors.name}
  helperText="This is your display name"
/>
```

### Dropdown
Select dropdown component with custom styling.

```tsx
import { Dropdown } from '@/components/ui';

<Dropdown
  label="Select an option"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  placeholder="Choose..."
  required
/>
```

### DatePicker
Date input component.

```tsx
import { DatePicker } from '@/components/ui';

<DatePicker
  label="Birth Date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  required
/>
```

### DateTimePicker
Date and time input component.

```tsx
import { DateTimePicker } from '@/components/ui';

<DateTimePicker
  label="Event Date & Time"
  value={dateTime}
  onChange={(e) => setDateTime(e.target.value)}
  required
/>
```

### MoneyInput
Currency input with automatic formatting (BRL format).

```tsx
import { MoneyInput } from '@/components/ui';

<MoneyInput
  label="Price"
  value={price}
  onChange={(value) => setPrice(value)}
  currency="BRL"
  required
/>
```

### CNPJInput
CNPJ input with automatic formatting and validation.

```tsx
import { CNPJInput } from '@/components/ui';

<CNPJInput
  label="CNPJ"
  value={cnpj}
  onChange={(value) => setCnpj(value)}
  required
/>
```

### CPFInput
CPF input with automatic formatting and validation.

```tsx
import { CPFInput } from '@/components/ui';

<CPFInput
  label="CPF"
  value={cpf}
  onChange={(value) => setCpf(value)}
  required
/>
```

### Toggle
Switch/toggle component.

```tsx
import { Toggle } from '@/components/ui';

<Toggle
  label="Enable notifications"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
  helperText="Receive email notifications"
/>
```

## Features

- ✅ Fully typed with TypeScript
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ Consistent styling with Tailwind CSS
- ✅ Reusable across the application

