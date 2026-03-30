import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-muted" />

      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>

        {/* Address */}
        <div className="h-4 bg-muted rounded w-4/5" />

        {/* Members + Time */}
        <div className="flex gap-4 pb-3 border-b border-border">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-28" />
        </div>

        {/* Amenity tags */}
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-md w-16" />
          <div className="h-6 bg-muted rounded-md w-20" />
          <div className="h-6 bg-muted rounded-md w-14" />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 bg-muted rounded w-16 mb-1" />
            <div className="h-6 bg-muted rounded w-24" />
          </div>
          <div className="text-right">
            <div className="h-3 bg-muted rounded w-12 mb-1" />
            <div className="h-5 bg-muted rounded w-16" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <div className="h-9 bg-muted rounded flex-1" />
          <div className="h-9 bg-muted rounded flex-1" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkeletonCard);
