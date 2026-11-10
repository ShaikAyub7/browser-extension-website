import Link from "next/link";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold ">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-4 ">
          The Privacy Policy page URL has changed and the page you are looking
          for is no longer available.
        </p>

        <p className="mt-2 ">
          Please visit the updated Privacy Policy page.
        </p>

        <Link
          href="/privacy"
          className="inline-block mt-6 rounded-lg px-6 py-3 bg-blue-600 text-white hover:opacity-90"
        >
          Go to Privacy Policy
        </Link>
      </div>
    </div>
  );
}
export default NotFound;