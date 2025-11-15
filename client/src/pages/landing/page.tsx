import { useState } from "react";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-screen w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      )}

      <iframe
        src="https://column-sample-08321954.figma.site/"
        className="h-screen w-full"
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default LandingPage;
