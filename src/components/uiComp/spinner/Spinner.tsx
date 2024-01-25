import "./Spinner.css";

interface SpinnerProps {
  flex?: boolean;
  size?: number;
  color?: string;
  speed?: number;
  containerCss?: string;
}

const Spinner = ({
  flex = false,
  size = 20,
  color = "#03045E",
  containerCss,
  speed = 0.8,
}: SpinnerProps) => {
  const loaderStyle = {
    "--spinner-size": `${size}px`,
    "--spinner-border-size": `${size / 10}px`,
    "--spinner-color": color,
    "--spinner-speed": `${1 / speed}s`,
  } as React.CSSProperties;

  return flex ? (
    <div className={`flex items-center justify-center w-full h-full ${containerCss}`}>
      <div className="loader" style={loaderStyle}></div>
    </div>
  ) : (
    <div className={`p-1 w-fit ${containerCss}`}>
      <div className="loader" style={loaderStyle}></div>
    </div>
  );
};

export default Spinner;
