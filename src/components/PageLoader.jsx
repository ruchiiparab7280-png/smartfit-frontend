import React from "react";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-muted" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
        </div>
        <p className="text-muted-foreground text-sm font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
