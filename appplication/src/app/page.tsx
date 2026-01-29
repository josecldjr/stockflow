import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50">
            <span className="text-sm font-bold text-zinc-50 dark:text-zinc-900">
              SF
            </span>
          </div>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            StockFlow
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl lg:text-6xl">
            Manage Your Inventory &amp; Cash Flow{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              with Confidence
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            StockFlow helps you track inventory, monitor cash flow, and make
            smarter business decisions. Simple, powerful, and built for growing
            businesses.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/register"
              className="flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-8 text-base font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
            >
              Create Free Account
            </Link>
            <Link
              href="#features"
              className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-8 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-24 w-full max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Everything you need to manage your business
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <svg
                  className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Inventory Tracking
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Keep track of stock levels, set alerts for low inventory, and
                manage products effortlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <svg
                  className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Cash Flow Management
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Monitor income and expenses, visualize cash flow trends, and
                plan for the future.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <svg
                  className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-50">
                Reports & Analytics
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Generate detailed reports and gain insights to make data-driven
                business decisions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 w-full max-w-3xl rounded-2xl bg-zinc-900 p-8 text-center dark:bg-zinc-800 md:p-12">
          <h2 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Join thousands of businesses already using StockFlow to streamline
            their operations.
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-zinc-50 px-8 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            Create Free Account
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 px-6 py-8 dark:border-zinc-800 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-900 dark:bg-zinc-50">
              <span className="text-xs font-bold text-zinc-50 dark:text-zinc-900">
                SF
              </span>
            </div>
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              StockFlow
            </span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} StockFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
