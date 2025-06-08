import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Code, Hash, Share2, Trash2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesText } from "../components/magicui/sparkles-text";

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200 relative">
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(120, 87, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 87, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "-1px -1px",
        }}
      ></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="relative w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 text-center">
          <div className="space-y-6">
            <h1 className="relative z-20 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Code <SparklesText className="inline-block">smarter</SparklesText>
              , build faster,
              <br />
              all in one intelligent space.
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Save, organize, and revisit your top code blocks with ease. Your
              personal developer armory—always accessible, always secure.
            </p>

            <div className="mt-10 flex justify-center">
              {isAuthenticated ? (
                <RainbowButton asChild>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center w-full h-full"
                  >
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </RainbowButton>
              ) : (
                <RainbowButton asChild>
                  <Link
                    to="/register"
                    className="flex items-center justify-center w-full h-full"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </RainbowButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#0a0a0f]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-4xl px-6 relative">
          <CardContainer containerClassName="py-0">
            <CardBody className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-xl w-full h-auto">
              <CardItem translateZ="10" className="w-full">
                <div className="bg-black/60 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm text-gray-400">
                      code-preview.js
                    </div>
                  </div>
                </div>
              </CardItem>

              <CardItem translateZ="20" className="w-full">
                <div className="p-6 bg-black/60 overflow-x-auto">
                  <pre className="text-sm font-mono">
                    <code className="language-javascript">
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">snippetManager</span>{" "}
                      <span className="text-gray-500">=</span> {"{"}
                      <br />
                      {"  "}
                      <span className="text-green-400">name</span>:{" "}
                      <span className="text-amber-400">'Armory X'</span>
                      ,
                      <br />
                      {"  "}
                      <span className="text-green-400">version</span>:{" "}
                      <span className="text-amber-400">'1.0.0'</span>,
                      <br />
                      {"  "}
                      <span className="text-green-400">features</span>: [
                      <br />
                      {"    "}
                      <span className="text-amber-400">
                        'Favorite Snippets'
                      </span>
                      ,
                      <br />
                      {"    "}
                      <span className="text-amber-400">
                        'Code Organization'
                      </span>
                      ,
                      <br />
                      {"    "}
                      <span className="text-amber-400">'Tag Management'</span>
                      ,
                      <br />
                      {"    "}
                      <span className="text-amber-400">
                        'Smart Trash System'
                      </span>
                      <br />
                      {"  "}],
                      <br />
                      {"  "}
                      <span className="text-green-400">languages</span>: [
                      <br />
                      {"    "}
                      <span className="text-amber-400">'JavaScript'</span>,{" "}
                      <span className="text-amber-400">'Python'</span>,{" "}
                      <span className="text-amber-400">'Java'</span>,{" "}
                      <span className="text-amber-400">'C++'</span>,
                      <br />
                      {"    "}
                      <span className="text-amber-400">'Ruby'</span>,{" "}
                      <span className="text-amber-400">'Go'</span>,{" "}
                      <span className="text-amber-400">'Rust'</span>,{" "}
                      <span className="text-amber-400">'PHP'</span>
                      <br />
                      {"  "}],
                      <br />
                      {"  "}
                      <span className="text-purple-400">saveSnippet</span>:{" "}
                      <span className="text-purple-400">function</span>(
                      <span className="text-orange-400">code</span>,{" "}
                      <span className="text-orange-400">language</span>,{" "}
                      <span className="text-orange-400">title</span>) {"{"}
                      <br />
                      {"    "}
                      <span className="text-purple-400">return</span> {"{"}
                      <br />
                      {"      "}
                      <span className="text-green-400">id</span>:{" "}
                      <span className="text-amber-400">
                        `snippet_${"{"}Math.random().toString(36).substring(2,
                        9)
                        {"}"}`
                      </span>
                      ,
                      <br />
                      {"      "}
                      <span className="text-green-400">title</span>:{" "}
                      <span className="text-orange-400">title</span>,
                      <br />
                      {"      "}
                      <span className="text-green-400">language</span>:{" "}
                      <span className="text-orange-400">language</span>,
                      <br />
                      {"      "}
                      <span className="text-green-400">code</span>:{" "}
                      <span className="text-orange-400">code</span>,
                      <br />
                      {"      "}
                      <span className="text-green-400">createdAt</span>:{" "}
                      <span className="text-purple-400">new</span>{" "}
                      <span className="text-blue-400">Date</span>()
                      <br />
                      {"    "}
                      {"}"}
                      <br />
                      {"  "}
                      {"}"},
                      <br />
                      {"  "}
                      <span className="text-purple-400">getStats</span>:{" "}
                      <span className="text-purple-400">function</span>() {"{"}
                      <br />
                      {"    "}
                      <span className="text-purple-400">return</span>{" "}
                      <span className="text-amber-400">
                        'Over 8,000+ snippets saved by developers worldwide!'
                      </span>
                      <br />
                      {"  "}
                      {"}"}
                      <br />
                      {"}"};
                    </code>
                  </pre>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>

      <div className="relative z-10 py-24 bg-[#0a0a0f]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            Powerful Features for Developers
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-black/40 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  Favorite Snippets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Mark your most-used code blocks as favorites for quick access
                  anytime. Great for boosting productivity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                  <Trash2 className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  Smart Trash System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Accidentally deleted a snippet? No worries — everything goes
                  to trash first. Restore or permanently delete it anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border-gray-700 hover:border-purple-500 transition-all duration-300 h-full">
              <CardHeader className="pb-2">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                  <Hash className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  Organize with Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Use tags and categories to keep your snippets organized and
                  easily searchable at any time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="relative z-10 bg-[#0a0a0f] border-t border-gray-800 py-8 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Armory X. Built by Ujjwal.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
