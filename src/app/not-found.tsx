import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center text-white">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <h2 className="text-4xl font-bold mb-4 -mt-16 relative z-10">Lost in the Woods?</h2>
                <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                    The page you are looking for has been moved, removed, or possibly never existed.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}
