/**
 * Pure-CSS architectural showroom environment: graphite walls, a polished
 * reflective floor, brushed-titanium seams and thin deep-teal light strips.
 * Kept static (no scroll-driven motion) so it reads as a stable set behind
 * the moving vehicles, per spec.
 */
export function ShowroomBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-graphite">
      {/* wall gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1b1e21 0%, #17191b 42%, #131517 58%, #0f1112 100%)",
        }}
      />

      {/* floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(21,23,25,0) 0%, rgba(10,11,12,0.9) 60%, rgba(6,7,8,1) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[30%] opacity-40 mix-blend-screen"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(174,180,184,0.05) 0px, rgba(174,180,184,0.05) 1px, transparent 1px, transparent 64px)",
          maskImage: "linear-gradient(180deg, transparent, black 60%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent, black 60%)",
        }}
      />

      {/* recessed linear lighting strips */}
      <div className="absolute inset-x-[8%] top-0 h-[2px] bg-gradient-to-r from-transparent via-titanium/30 to-transparent" />
      <div className="absolute left-[6%] top-0 h-full w-px bg-gradient-to-b from-transparent via-titanium/10 to-transparent" />
      <div className="absolute right-[6%] top-0 h-full w-px bg-gradient-to-b from-transparent via-titanium/10 to-transparent" />

      {/* teal LED accent glows */}
      <div className="absolute bottom-[22%] left-[-4%] h-40 w-[45%] rounded-full bg-teal/10 blur-[90px]" />
      <div className="absolute bottom-[18%] right-[-4%] h-40 w-[45%] rounded-full bg-teal-light/10 blur-[100px]" />
      <div className="absolute left-1/2 top-[8%] h-24 w-[60%] -translate-x-1/2 rounded-full bg-titanium/[0.04] blur-[110px]" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 42%, transparent 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}
