import React, { useState, useEffect } from "react";
import { Search, X, FolderOpen, FileCode, Loader2 } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    categories: [],
    codes: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults({ categories: [], codes: [] });
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async () => {
    if (searchQuery.trim().length < 2) {
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const [categoriesRes, allCodesRes] = await Promise.all([
        axiosSecure.get("/categories"),
        axiosSecure.get("/all-codes"),
      ]);

      const query = searchQuery.toLowerCase();

      const filteredCategories = categoriesRes.data.filter((cat) =>
        cat.title.toLowerCase().includes(query)
      );

      const filteredCodes = allCodesRes.data.filter(
        (code) =>
          code.title.toLowerCase().includes(query) ||
          code.code.toLowerCase().includes(query)
      );

      setSearchResults({
        categories: filteredCategories,
        codes: filteredCodes,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults({ categories: [], codes: [] });
    setHasSearched(false);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-600 px-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const totalResults =
    searchResults.categories.length + searchResults.codes.length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories and codes..."
          className="input input-bordered w-full pl-12 pr-12 py-3 text-base"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {(hasSearched || isSearching) && (
        <div className="mt-4 bg-base-100 border border-base-300 rounded-2xl shadow-lg overflow-hidden">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="animate-spin text-primary mb-4" size={40} />
              <p className="text-base-content/60">Searching...</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="bg-base-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Search size={40} className="text-base-content/30" />
              </div>
              <p className="text-base-content/70 text-lg font-medium mb-2">
                No results found for "{searchQuery}"
              </p>
              <p className="text-sm text-base-content/50">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6 pb-4 border-b border-base-300">
                <div className="flex items-center justify-center">
                  <p className="text-base-content/70">
                    Found{" "}
                    <span className="font-bold text-primary text-lg">
                      {totalResults}
                    </span>{" "}
                    result{totalResults !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {searchResults.categories.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FolderOpen size={18} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-base-content">
                      Categories
                    </h3>
                    <span className="badge badge-primary">
                      {searchResults.categories.length}
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {searchResults.categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/codes/${category._id}`}
                        className="group block p-4 rounded-xl hover:bg-base-200 transition-all border border-base-300 hover:border-primary/50 hover:shadow-md"
                      >
                        <div className="flex items-center gap-4">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.title}
                              className="w-8 h-8 rounded-xl transition-colors"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                              <FolderOpen className="text-primary" size={24} />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-base-content group-hover:text-primary transition-colors">
                              {highlightText(category.title, searchQuery)}
                            </p>
                            <p className="text-xs text-base-content/50 mt-1">
                              Category
                            </p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                              className="w-5 h-5 text-primary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.codes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-secondary/10 p-2 rounded-lg">
                      <FileCode size={18} className="text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-base-content">
                      Code Snippets
                    </h3>
                    <span className="badge badge-secondary">
                      {searchResults.codes.length}
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {searchResults.codes.map((code) => (
                      <Link
                        key={code._id}
                        to={`/view-code/${code._id}`}
                        className="group block p-4 rounded-xl hover:bg-base-200 transition-all border border-base-300 hover:border-secondary/50 hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                            <FileCode size={20} className="text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-base-content group-hover:text-secondary transition-colors mb-2">
                              {highlightText(code.title, searchQuery)}
                            </p>
                            <div className="bg-base-300/50 rounded-lg p-3 overflow-hidden">
                              <pre className="text-xs text-base-content/70 font-mono overflow-hidden text-ellipsis">
                                {code.code.substring(0, 100)}
                                {code.code.length > 100 ? "..." : ""}
                              </pre>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-secondary"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
