import Image from "next/image";

export default function BackgroundImg() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/img/love.png"
        alt="background"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
