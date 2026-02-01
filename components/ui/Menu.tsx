import React, { useState, useRef, useEffect } from 'react';

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  divider?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  divider = false,
}) => {
  if (divider) {
    return <div className="border-t border-gray-200 my-1" />;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700
        hover:bg-gray-100 transition-colors duration-150
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `.trim()}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
    </button>
  );
};

export interface MenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  menuClassName?: string;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  trigger,
  align = 'right',
  className = '',
  menuClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`
            absolute z-50 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200
            py-1 overflow-hidden
            ${align === 'left' ? 'left-0' : 'right-0'}
            ${menuClassName}
          `.trim()}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === MenuItem) {
              const menuItemChild = child as React.ReactElement<MenuItemProps>;
              return React.cloneElement(menuItemChild, {
                onClick: () => {
                  menuItemChild.props.onClick?.();
                  handleMenuItemClick();
                },
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

export interface MenuGroupProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export const MenuGroup: React.FC<MenuGroupProps> = ({ children, label, className = '' }) => {
  return (
    <div className={className}>
      {label && (
        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {label}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

