import { BackgroundImg } from "@/common";


export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 w-full h-screen overflow-hidden">
      {/* Background Image */}
      <BackgroundImg />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          曹磊.博客
        </h1>
        <p className="mt-3 text-lg md:text-xl text-white/90 drop-shadow-md">
          one Day
        </p>
      </div>

      {/* Right Side Action Buttons */}
      {/* <div className="fixed right-4 bottom-8 z-20 flex flex-col gap-3">
        <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-blue-500 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-600 hover:bg-white hover:text-blue-500 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01" />
          </svg>
        </button>
      </div> */}
    </div>
  );
}
