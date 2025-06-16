import { Star as StarFill, Star as StarOutline } from "lucide-react";

function StarRating({ rating }: { rating: number }){
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;
    
    return (
    <div className="flex items-center space-x-0.5 text-orange-400">
      {Array.from({ length: fullStars }).map((_, i) => (
        <StarFill key={`full-${i}`} fill="currentColor" stroke="currentColor" className="w-5 h-5" />
      ))}

      {hasHalfStar && (
        <div className="relative w-5 h-5">
          <StarFill
            fill="currentColor"
            stroke="currentColor"
            className="w-5 h-5 absolute left-0 top-0 clip-half"
          />
          <StarOutline className="w-5 h-5 text-orange-400" />
        </div>
      )}

      {Array.from({ length: totalStars - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <StarOutline key={`empty-${i}`} className="w-5 h-5 text-orange-400" />
      ))}
    </div>
  );
}

export default StarRating;