const EditIcon = ({ size = undefined, className = 'w-5 h-5' }: IconProp) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={!size ? className : undefined}
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3076 0.0357416C10.7141 0.0357416 11.0441 0.365664 11.0441 0.772177C11.0441 1.17869 10.7141 1.50861 10.3076 1.50861H6.63625C4.09899 1.50861 2.46017 3.2466 2.46017 5.93606V14.0997C2.46017 16.7891 4.09899 18.5271 6.63625 18.5271H15.3007C17.8379 18.5271 19.4777 16.7891 19.4777 14.0997V10.1445C19.4777 9.73803 19.8076 9.4081 20.2141 9.4081C20.6207 9.4081 20.9506 9.73803 20.9506 10.1445V14.0997C20.9506 17.6287 18.6794 20 15.3007 20H6.63625C3.25749 20 0.987305 17.6287 0.987305 14.0997V5.93606C0.987305 2.40706 3.25749 0.0357416 6.63625 0.0357416H10.3076ZM18.8597 0.898451L20.0547 2.09344C20.637 2.67473 20.9571 3.4475 20.9561 4.27034C20.9561 5.09318 20.636 5.86497 20.0547 6.44528L12.6815 13.8185C12.1405 14.3595 11.4197 14.658 10.6538 14.658H6.9756C6.77725 14.658 6.58676 14.5775 6.44831 14.4351C6.30986 14.2937 6.23426 14.1022 6.23916 13.9029L6.33146 10.1923C6.35012 9.45386 6.64764 8.75965 7.17002 8.23629L14.5088 0.898451C15.7087 -0.299484 17.6598 -0.299484 18.8597 0.898451ZM13.9044 3.58496L8.21183 9.2781C7.95751 9.53241 7.81317 9.87019 7.80433 10.2286L7.73069 13.1851H10.6538C11.027 13.1851 11.3765 13.0408 11.6407 12.7767L17.3676 7.04817L13.9044 3.58496ZM15.5497 1.94026L14.9452 2.54316L18.4084 6.00734L19.0139 5.40347C19.3163 5.10104 19.4832 4.69845 19.4832 4.27034C19.4832 3.84124 19.3163 3.43768 19.0139 3.13525L17.8189 1.94026C17.1934 1.31675 16.1761 1.31675 15.5497 1.94026Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default EditIcon;
