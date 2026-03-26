import React, { useState, useEffect } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/${email}`
        );
        const data = await res.json();

        const sorted = (Array.isArray(data) ? data : []).sort(
          (a, b) =>
            new Date(b.created_at || 0) - new Date(a.created_at || 0)
        );

        setReviews(sorted);
      } catch (err) {
        console.log("Reviews fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const renderStars = (rating) => {
    const filled = Math.round(Number(rating) || 0);
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < filled ? "text-yellow-400" : "text-slate-600"}`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400 text-lg">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Customer Reviews</h2>
        <p className="text-slate-400 mt-1">
          See what your members are saying about your gym
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 text-center">
          <p className="text-3xl font-bold text-yellow-400">{avgRating}</p>
          <div className="flex justify-center mt-1">{renderStars(avgRating)}</div>
          <p className="text-sm text-slate-400 mt-2">Average Rating</p>
        </div>

        <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 text-center">
          <p className="text-3xl font-bold text-white">{reviews.length}</p>
          <p className="text-sm text-slate-400 mt-2">Total Reviews</p>
        </div>

        <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">
            {reviews.filter((r) => Number(r.rating) >= 4).length}
          </p>
          <p className="text-sm text-slate-400 mt-2">Positive Reviews (4★+)</p>
        </div>
      </div>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-12 text-center">
          <p className="text-4xl mb-3">📝</p>
          <h3 className="text-lg font-semibold text-white mb-1">
            No reviews yet
          </h3>
          <p className="text-slate-400 text-sm">
            Reviews from your members will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={review.id || index}
              className="bg-[#111827] rounded-xl border border-slate-800 p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {(review.user_email || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {review.user_email || "Anonymous"}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-2 sm:mt-0">
                  {renderStars(review.rating)}
                  <span className="text-slate-400 text-sm ml-1">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {review.comment && (
                <p className="text-slate-300 text-sm leading-relaxed pl-[52px]">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
