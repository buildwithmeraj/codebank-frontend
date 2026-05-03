import { FileText, Edit, Play, CodeXml } from "lucide-react"; // Lucide icons

const Home = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <title>Home - CodeBank</title>

      <section className="hero-bg rounded-xl bg-base-100 py-12 text-white md:py-14">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to CodeBank</h1>
          <p className="text-xl mb-8">
            Your personal repository for code snippets and programming
            knowledge.
          </p>
          <div className="hero-btn-bg p-6">
            <a href="/profile" className="btn btn-primary">
              <Play size={20} />
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="py-2">
        <div className="container mx-auto text-center">
          <h2 className="mb-5 text-4xl font-bold">What can you do?</h2>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-2xl transition-all hover:scale-105 duration-300 shadow-sm hover:shadow-lg bg-base-200">
              <div className="flex justify-center text-blue-500 mb-4">
                <CodeXml size={60} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Store Code Snippets
              </h3>
              <p className="text-lg">
                Save your most used code snippets across various programming
                languages.
              </p>
            </div>
            <div className="p-6 rounded-2xl transition-all hover:scale-105 duration-300 shadow-sm hover:shadow-lg bg-base-200">
              <div className="flex justify-center text-blue-500 mb-4">
                <FileText size={60} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Organize by Categories
              </h3>
              <p className="text-lg">
                Organize your snippets into categories for easy access.
              </p>
            </div>
            <div className="p-6 rounded-2xl transition-all hover:scale-105 duration-300 shadow-sm hover:shadow-lg bg-base-200">
              <div className="flex justify-center text-blue-500 mb-4">
                <Edit size={60} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Edit and Delete</h3>
              <p className="text-lg">
                Easily modify or remove snippets as you go, keeping your
                collection fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-base-100 py-2">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-4xl font-bold">Getting Started</h2>
          <p className="mb-5 text-lg">
            To get started, simply log in using your Google account and begin
            saving your code snippets. You can create categories to organize
            your snippets by language, project, or any system that works for
            you.
          </p>
          <a href="/profile" className="btn btn-primary">
            <Play size={20} className="inline-block" />
            Get Started
          </a>
        </div>
      </section>

      <section className="rounded-xl bg-base-100 p-2">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-center text-4xl font-bold">
            Why Developers Use CodeBank
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-base-300 bg-base-200 p-6">
              <h3 className="mb-2 text-xl font-semibold">Fast Retrieval</h3>
              <p>
                Find snippets instantly by category or search, so you spend less
                time hunting and more time building.
              </p>
            </article>
            <article className="rounded-xl border border-base-300 bg-base-200 p-6">
              <h3 className="mb-2 text-xl font-semibold">Clean Structure</h3>
              <p>
                Keep your coding knowledge organized in one place with clear
                categories and readable code entries.
              </p>
            </article>
            <article className="rounded-xl border border-base-300 bg-base-200 p-6">
              <h3 className="mb-2 text-xl font-semibold">Daily Workflow Fit</h3>
              <p>
                Save, edit, and reuse common patterns as part of your normal
                routine across projects and stacks.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-base-100 p-2">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-4xl font-bold">
            Suggested Workflow
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-base-300 p-5 text-center">
              <p className="mb-2 text-sm font-semibold text-primary">Step 1</p>
              <h3 className="text-lg font-semibold">Create Category</h3>
              <p className="mt-2 text-sm">
                Group snippets by language, framework, or use case.
              </p>
            </div>
            <div className="rounded-xl border border-base-300 p-5 text-center">
              <p className="mb-2 text-sm font-semibold text-primary">Step 2</p>
              <h3 className="text-lg font-semibold">Add Snippets</h3>
              <p className="mt-2 text-sm">
                Save working code blocks with descriptive titles.
              </p>
            </div>
            <div className="rounded-xl border border-base-300 p-5 text-center">
              <p className="mb-2 text-sm font-semibold text-primary">Step 3</p>
              <h3 className="text-lg font-semibold">Search & Reuse</h3>
              <p className="mt-2 text-sm">
                Quickly find old solutions and use them in new tasks.
              </p>
            </div>
            <div className="rounded-xl border border-base-300 p-5 text-center">
              <p className="mb-2 text-sm font-semibold text-primary">Step 4</p>
              <h3 className="text-lg font-semibold">Keep Improving</h3>
              <p className="mt-2 text-sm">
                Update snippets as your practices evolve over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl bg-base-200 p-5 md:p-7 mt-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-2 text-4xl font-bold">Ready to Build Faster?</h2>
          <p className="mb-5 text-lg">
            Start building your personal coding knowledge base today and make
            repeated work a thing of the past.
          </p>
          <a href="/profile" className="btn btn-primary">
            <Play size={20} className="inline-block" />
            Go to Profile
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
