import { cn } from "@/lib/utils";

const GeometricPattern = ({ className, variant = "background" }) => {
  const patterns = [
    { color: "pattern-blue", rotation: "rotate-45", delay: "0s" },
    { color: "pattern-orange", rotation: "rotate-12", delay: "2s" },
    { color: "pattern-green", rotation: "-rotate-12", delay: "4s" },
  ];

  if (variant === "background") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div className="absolute -top-20 -right-20 w-40 h-40 opacity-5">
          {patterns.map((pattern, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 border-2 rounded-lg animate-float",
                `border-${pattern.color}`,
                pattern.rotation
              )}
              style={{ animationDelay: pattern.delay }}
            />
          ))}
        </div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 opacity-5">
          {patterns.map((pattern, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 border-2 rounded-lg animate-float",
                `border-${pattern.color}`,
                pattern.rotation
              )}
              style={{ animationDelay: pattern.delay }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex space-x-2", className)}>
      {patterns.map((pattern, i) => (
        <div
          key={i}
          className={cn(
            "w-3 h-3 border-2 rounded-sm animate-float",
            `border-${pattern.color}`,
            pattern.rotation
          )}
          style={{ animationDelay: pattern.delay }}
        />
      ))}
    </div>
  );
};

export default GeometricPattern;