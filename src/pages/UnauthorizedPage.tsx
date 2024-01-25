import AuthErrorCard from "../components/uiComp/cards/AuthErrorCard";

function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <AuthErrorCard />
    </div>
  );
}

export default UnauthorizedPage;
