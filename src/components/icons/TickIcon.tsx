const TickIcon = ({ size = undefined, className = 'w-5 h-4' }: IconProp) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={!size ? className : undefined}
            viewBox="0 0 16 12"
            fill="none"
        >
            <path
                d="M1 7L5.05263 11L15 1"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default TickIcon;
