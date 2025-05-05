import PropTypes from 'prop-types'

function Button({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  className = '',
  isLoading = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  ...props 
}) {
  const baseClasses = 'btn inline-flex items-center justify-center font-medium focus:outline-none transition duration-200 ease-in-out'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outline: 'btn-outline',
    danger: 'btn-danger',
    ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
  }
  
  const sizeClasses = {
    small: 'text-sm px-3 py-1.5 rounded-md',
    medium: 'px-4 py-2 rounded-lg',
    large: 'text-lg px-5 py-2.5 rounded-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const disabledClasses = props.disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${disabledClasses}
        ${className}
      `}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'danger', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool
}

export default Button