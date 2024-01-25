interface CssClass {
  css?: string;
}

const ArrowUpIcon = ({ css }: CssClass) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 20 11"
      fill="currentColor"
      className={`${css} transition-all`}
    >
      <path
        d="M0.283445 10.6843C0.627015 11.0279 1.16465 11.0591 1.5435 10.778L1.65204 10.6843L10 2.33681L18.348 10.6843C18.6915 11.0279 19.2292 11.0591 19.608 10.778L19.7166 10.6843C20.0601 10.3408 20.0914 9.80313 19.8103 9.42427L19.7166 9.31573L10.6843 0.283477C10.3407 -0.0600929 9.8031 -0.0913277 9.42424 0.189775L9.3157 0.283477L0.283445 9.31573C-0.0944817 9.69366 -0.0944817 10.3064 0.283445 10.6843Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowUpIcon;
