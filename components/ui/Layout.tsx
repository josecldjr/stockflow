import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}

export interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return <div className={`min-h-screen bg-gray-50 ${className}`}>{children}</div>;
};

export const Header: React.FC<HeaderProps> = ({ children, className = '' }) => {
  return (
    <header className={`bg-white border-b border-gray-200 shadow-sm ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </header>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ children, className = '', collapsed = false }) => {
  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      <div className="h-full py-4">{children}</div>
    </aside>
  );
};

export const Content: React.FC<ContentProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex-1 overflow-auto ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-6">{children}</div>
    </main>
  );
};

export interface LayoutWithSidebarProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  className?: string;
}

export const LayoutWithSidebar: React.FC<LayoutWithSidebarProps> = ({
  header,
  sidebar,
  children,
  sidebarCollapsed = false,
  className = '',
}) => {
  const hasHeader = !!header;
  const heightClass = hasHeader ? 'h-[calc(100vh-64px)]' : 'h-screen';

  return (
    <Layout className={className}>
      {header && <Header>{header}</Header>}
      <div className={`flex ${heightClass}`}>
        {sidebar && <Sidebar collapsed={sidebarCollapsed}>{sidebar}</Sidebar>}
        <Content>{children}</Content>
      </div>
    </Layout>
  );
};

