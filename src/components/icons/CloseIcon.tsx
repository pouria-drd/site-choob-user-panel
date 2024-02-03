const CloseIcon = ({ size = undefined, className = 'w-3 h-3' }: IconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={!size ? className : undefined}
      viewBox="0 0 10 10"
      fill="none"
    >
      <path
        d="M9 9L1 1M9 1L1 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseIcon;
