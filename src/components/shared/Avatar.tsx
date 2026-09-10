import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  boost?: boolean;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  boost = false,
  className,
}: AvatarProps) {
  return (
    <div
      className={`h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-card ${
        className ?? ""
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="72px"
        className={`h-full w-full object-cover ${
          boost
            ? "brightness-[1.35] contrast-[1.1]"
            : "brightness-[1.08] contrast-[1.03]"
        }`}
      />
    </div>
  );
}