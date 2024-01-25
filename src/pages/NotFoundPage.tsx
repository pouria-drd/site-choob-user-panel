import NotFoundImage from "../assets/images/404.png";

function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img src={NotFoundImage} alt="NotFoundImage" />
    </div>
  );
}

export default NotFoundPage;
