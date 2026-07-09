// Simple centered loading spinner used while data is being fetched
const Loader = ({ size = "md" }) => {
  const dimensions = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-12 h-12" : "w-8 h-8";
  return (
    <div className="flex items-center justify-center py-8">
      <div className={`spinner ${dimensions}`} role="status" aria-label="Loading" />
    </div>
  );
};

export default Loader;
