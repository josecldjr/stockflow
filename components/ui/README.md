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

### Layout
Layout components for structuring your application pages.

```tsx
import { Layout, Header, Sidebar, Content, LayoutWithSidebar } from '@/components/ui';

// Simple layout
<Layout>
  <Header>Header Content</Header>
  <Content>Main Content</Content>
</Layout>

// Layout with sidebar
<LayoutWithSidebar
  header={<Header>App Header</Header>}
  sidebar={<Sidebar>Navigation Menu</Sidebar>}
  sidebarCollapsed={false}
>
  <div>Page Content</div>
</LayoutWithSidebar>
```

### Tabs
Tab navigation component.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

<Tabs defaultValue="tab1" onTabChange={(tab) => console.log(tab)}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab 1</TabsContent>
  <TabsContent value="tab2">Content for Tab 2</TabsContent>
</Tabs>
```

### Menu
Dropdown menu component.

```tsx
import { Menu, MenuItem, MenuGroup } from '@/components/ui';

<Menu
  trigger={<button>Open Menu</button>}
  align="right"
>
  <MenuGroup label="Actions">
    <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
    <MenuItem onClick={() => console.log('Delete')}>Delete</MenuItem>
  </MenuGroup>
  <MenuItem divider />
  <MenuItem onClick={() => console.log('Settings')}>Settings</MenuItem>
</Menu>
```

### Table
Responsive table component with mobile card view.

```tsx
import { Table, ResponsiveTable } from '@/components/ui';

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  {
    key: 'email',
    header: 'Email',
    render: (item) => <a href={`mailto:${item.email}`}>{item.email}</a>,
  },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Standard table
<Table
  data={data}
  columns={columns}
  onRowClick={(item) => console.log(item)}
  emptyMessage="No users found"
/>

// Responsive table (shows cards on mobile)
<ResponsiveTable
  data={data}
  columns={columns}
  breakpoint="md"
  mobileCardRender={(item) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3>{item.name}</h3>
      <p>{item.email}</p>
    </div>
  )}
/>
```

### Tooltip
Tooltip component with positioning.

```tsx
import { Tooltip } from '@/components/ui';

<Tooltip
  content="This is a helpful tooltip"
  position="top"
  delay={200}
>
  <button>Hover me</button>
</Tooltip>
```

## Features

- ✅ Fully typed with TypeScript
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ Consistent styling with Tailwind CSS
- ✅ Reusable across the application
- ✅ Mobile-first approach

