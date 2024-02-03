const ArrowDownIcon = ({ size = undefined, className = 'w-4 h-2' }: IconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={`${!size ? className : undefined} cursor-pointer`}
      viewBox="0 0 14 8"
      fill="none"
    >
      <path
        d="M0.198412 0.198412C0.43891 -0.0420873 0.815252 -0.0639508 1.08045 0.132821L1.15643 0.198412L7 6.04168L12.8436 0.198412C13.0841 -0.0420873 13.4604 -0.0639508 13.7256 0.132821L13.8016 0.198412C14.0421 0.43891 14.064 0.815252 13.8672 1.08045L13.8016 1.15643L7.47901 7.47901C7.23851 7.71951 6.86217 7.74137 6.59697 7.5446L6.52099 7.47901L0.198412 1.15643C-0.0661372 0.891879 -0.0661372 0.46296 0.198412 0.198412Z"
        fill="#03045E"
      />
    </svg>
  );
};

export default ArrowDownIcon;
