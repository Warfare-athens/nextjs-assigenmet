import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      
        
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sales Dashboard</h1>
          <p className="text-gray-600 mb-6">A comprehensive analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS</p>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View Dashboard
          </Link>
        </div>
        </main>

    </div>
  );
}
