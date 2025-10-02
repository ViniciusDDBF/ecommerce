import React from 'react';

interface CustomerInitialsProps {
  firstName: string | null;
  lastName?: string;
  email?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const CustomerInitials: React.FC<CustomerInitialsProps> = ({
  firstName,
  lastName,
  email,
  size = 'md',
}) => {
  const sizeClasses = {
    xs: {
      container: 'gap-2',
      avatar: 'w-6 h-6 text-xs',
      name: 'text-xs',
      email: 'text-xs',
    },
    sm: {
      container: 'gap-2',
      avatar: 'w-8 h-8 text-sm',
      name: 'text-sm',
      email: 'text-xs',
    },
    md: {
      container: 'gap-3',
      avatar: 'w-10 h-10 text-base',
      name: 'text-base',
      email: 'text-sm',
    },
    lg: {
      container: 'gap-3',
      avatar: 'w-12 h-12 text-lg',
      name: 'text-lg',
      email: 'text-base',
    },
    xl: {
      container: 'gap-4',
      avatar: 'w-16 h-16 text-xl',
      name: 'text-xl',
      email: 'text-base',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center ${classes.container}`}>
      <div
        className={`${classes.avatar} bg-charcoal-700 text-ember-400 flex items-center justify-center rounded-full font-semibold`}
      >
        {`${firstName?.[0] || ''}${lastName?.[0] || ''} `}
      </div>
      <div className="flex flex-col">
        <h1 className={`${classes.name} text-charcoal-100 font-medium`}>
          {firstName}
        </h1>
        {email && (
          <h1 className={`${classes.email} text-charcoal-400`}>{email}</h1>
        )}
      </div>
    </div>
  );
};
