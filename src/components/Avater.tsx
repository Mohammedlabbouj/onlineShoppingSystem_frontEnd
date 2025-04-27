interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };
  const placeholderTextSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Extract initials for placeholder
  const initials = alt
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex-shrink-0 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.style.display = "none"; // Hide broken image
            // Show initials (alternative: target.src = placeholderUrl)
            const parent = target.parentElement;
            if (parent) {
              const initialsDiv = parent.querySelector(".initials-placeholder");
              if (initialsDiv) initialsDiv.classList.remove("hidden");
            }
          }}
        />
      ) : null}
      {/* Initials Placeholder (shown if no src or src fails) */}
      <div
        className={`initials-placeholder font-semibold text-gray-500 ${placeholderTextSize[size]} ${src ? "hidden" : ""}`}
      >
        {initials}
      </div>
    </div>
  );
};
