import Image from "next/image";

export default function BackgroundImg() {
  return (
    <div className="absolute inset-0 z-0 bg-[#53ade5]">
      <Image
        src="/img/love.webp"
        alt="background"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAIAAAAy3EnLAAABB0lEQVR42pWOzUrDUBSE55x7k2C1jbQUQboQ8QnqwrUblz6dz+GbCIJvIFiQ1v7EpslNcs+4EAVdSB1m8cHAzMjt/SMgAADuAdBv2g+g+Kc8wD9ig5BwQn4NfV76YRKEAGKQiRYXySZEUYgX7Uz9r8pIHDjXURpTtk1RFSd573LspiPbdc3DPHgApBoUENLO+93NpFxU66flq4vz3tHLMJezQd20ZcpwNWw9YId+lSez42Q28IvT3rooVwl20zyImojQuKmFUKNG8/56fNdP3lLZCUjRCNdRARBZCK5s0m1It01atT50vjXnR9kzxUVLACU0Ri2qdFlmqyp7r5O6UzMBSaE6p6ofM6GE7WzJXBsAAAAASUVORK5CYII="
      />
    </div>
  )
}
