import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../components/utilities/Loading";
import { ChevronRight, Copy, Check } from "lucide-react";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";

const ViewCode = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const codeRef = useRef(null);

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axiosSecure.get(`/code/${id}`);
        setCode(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("Code not found.");
          } else if (error.response.status === 403) {
            toast.error("You are not authorized to view this code.");
          } else {
            toast.error(
              "Failed to fetch the code: " + error.response.data.message
            );
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
        navigate(`/categories/`);
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
  }, []);

  useEffect(() => {
    if (code.code && codeRef.current) {
      const result = hljs.highlightAuto(code.code);
      setDetectedLanguage(result.language || "plaintext");

      const lines = code.code.split("\n");
      const highlightedLines = lines
        .map((line, index) => {
          const lineResult = hljs.highlight(line, {
            language: result.language || "plaintext",
          });
          return `<div class="code-line"><span class="line-number">${
            index + 1
          }</span><span class="line-content">${lineResult.value}</span></div>`;
        })
        .join("");

      codeRef.current.innerHTML = highlightedLines;
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy code.", error);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <title>View Code - CodeBank</title>

      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
            >
              Home
            </Link>
          </li>
          <li className="inline-flex items-center">
            <ChevronRight size={18} />
            <Link
              to="/categories"
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand ml-1"
            >
              Categories
            </Link>
          </li>
          <li className="inline-flex items-center">
            <ChevronRight size={18} />
            <Link
              to={`/codes/${code.categoryId}`}
              className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand ml-1"
            >
              Codes
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight size={18} />
              <span className="ml-1 text-sm font-medium text-body-subtle">
                {code.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <h2 className="text-2xl font-bold text-center mb-4"></h2>

      {/* Browser Mockup */}
      <div className="mockup-browser border border-base-300 w-full rounded-lg">
        <div className="mockup-browser-toolbar mockup-browser-toolbar-none flex items-center justify-between px-4">
          {detectedLanguage && (
            <span className="text-sm">{detectedLanguage}</span>
          )}
          <p className="font-semibold text-xl">{code.title}</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 btn btn-info"
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span className="hidden lg:block">Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <div className="overflow-hidden">
          <pre className="overflow-x-auto hljs">
            <code ref={codeRef} />
          </pre>
        </div>
      </div>

      <style>{`
        .code-line {
          display: flex;
          min-height: 1.5rem;
        }
        
        .line-number {
          display: inline-block;
          width: 3rem;
          text-align: right;
          padding-right: 1rem;
          user-select: none;
          flex-shrink: 0;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          margin-right: 1rem;
          opacity: 0.5;
        }
        
        .line-content {
          flex: 1;
          white-space: pre;
        }
        
        pre.hljs {
          margin: 0;
          padding: 1.5rem;
        }
        
        pre code {
          display: block;
          background: transparent;
        }
      `}</style>
    </>
  );
};

export default ViewCode;
