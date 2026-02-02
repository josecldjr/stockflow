import React from 'react';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor?: (item: T, index: number) => string;
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((item: T, index: number) => string);
  emptyMessage?: string;
  onRowClick?: (item: T, index: number) => void;
  loading?: boolean;
  loadingMessage?: string;
}

export function Table<T = any>({
  data,
  columns,
  keyExtractor,
  className = '',
  headerClassName = '',
  rowClassName = '',
  emptyMessage = 'No data available',
  onRowClick,
  loading = false,
  loadingMessage = 'Loading...',
}: TableProps<T>) {
  const getRowKey = (item: T, index: number): string => {
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    if (typeof item === 'object' && item !== null && 'id' in item) {
      return String((item as any).id);
    }
    return `row-${index}`;
  };

  const getRowClassName = (item: T, index: number): string => {
    const baseClass = 'border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150';
    const clickableClass = onRowClick ? 'cursor-pointer' : '';
    
    if (typeof rowClassName === 'function') {
      return `${baseClass} ${clickableClass} ${rowClassName(item, index)}`.trim();
    }
    
    return `${baseClass} ${clickableClass} ${rowClassName}`.trim();
  };

  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
              <thead className={`bg-gray-50 ${headerClassName}`}>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`
                        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                        ${column.headerClassName || ''}
                      `.trim()}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">{loadingMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
              <thead className={`bg-gray-50 ${headerClassName}`}>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`
                        px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                        ${column.headerClassName || ''}
                      `.trim()}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">{emptyMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
            <thead className={`bg-gray-50 ${headerClassName}`}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={`
                      px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      ${column.headerClassName || ''}
                    `.trim()}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr
                  key={getRowKey(item, index)}
                  onClick={() => onRowClick?.(item, index)}
                  className={getRowClassName(item, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900
                        ${column.className || ''}
                      `.trim()}
                    >
                      {column.render
                        ? column.render(item, index)
                        : typeof item === 'object' && item !== null && column.key in item
                        ? String((item as any)[column.key])
                        : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export interface ResponsiveTableProps<T = any> extends TableProps<T> {
  breakpoint?: 'sm' | 'md' | 'lg';
  mobileCardRender?: (item: T, index: number) => React.ReactNode;
}

export function ResponsiveTable<T = any>({
  breakpoint = 'md',
  mobileCardRender,
  ...tableProps
}: ResponsiveTableProps<T>) {
  const breakpointClasses = {
    sm: 'sm:block',
    md: 'md:block',
    lg: 'lg:block',
  };

  const defaultMobileCard = (item: T, index: number) => (
    <div key={tableProps.keyExtractor ? tableProps.keyExtractor(item, index) : `card-${index}`} className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      {tableProps.columns.map((column) => (
        <div key={column.key} className="mb-3 last:mb-0">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {column.header}
          </div>
          <div className="text-sm text-gray-900">
            {column.render
              ? column.render(item, index)
              : typeof item === 'object' && item !== null && column.key in item
              ? String((item as any)[column.key])
              : ''}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Table */}
      <div className={`hidden ${breakpointClasses[breakpoint]}`}>
        <Table {...tableProps} />
      </div>

      {/* Mobile Cards */}
      <div className={`block ${breakpointClasses[breakpoint]}`}>
        {tableProps.loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">{tableProps.loadingMessage || 'Loading...'}</p>
          </div>
        ) : tableProps.data.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">{tableProps.emptyMessage || 'No data available'}</p>
          </div>
        ) : (
          <div>
            {tableProps.data.map((item, index) =>
              mobileCardRender
                ? mobileCardRender(item, index)
                : defaultMobileCard(item, index)
            )}
          </div>
        )}
      </div>
    </>
  );
}


