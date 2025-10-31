import { Grip, Search } from "lucide-react";
import type { Route } from "./+types/home";
import { ChatUI } from "~/components/chat/ChatUI";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  console.log(import.meta.env);
  return { message: "" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="h-screen flex flex-row">
      <div className="sidebar w-18">
        <div className="flex flex-col items-center mt-20 gap-5">
          <div className="w-10 h-10 p-1 ring-2 rounded-lg ring-orange-500  flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-white rounded overflow-hidden">
              <img
                src="https://pngimg.com/d/microsoft_PNG9.png"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="w-10 h-10 ring-2 rounded-md bg-white flex items-center justify-center overflow-hidden">
            <img
              src="https://pngimg.com/d/amazon_PNG27.png"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-10 h-10 ring-2 rounded-md bg-white flex items-center justify-center overflow-hidden">
            <img
              src="https://pngimg.com/uploads/google/google_PNG19630.png"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="h-18 fixed top-0 left-0 p-5 right-0 flex items-center w-full">
        <div className="flex-1">
          <img
            src="https://www.bladge.com/images/logo.svg"
            alt=""
            className="h-10"
          />
        </div>
        <div className="flex-1">
          <div className="border border-white/25 rounded-full w-full h-12 flex items-center pl-3">
            <Search className="w-4 h-4" />
            <input
              type="text"
              className="w-full h-full focus:outline-none font-light p-3 text-sm text-white"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-5">
          <Grip className="w-6 h-6" />
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            <img
              src="https://i.guim.co.uk/img/media/ef573276855d9e04aaed3dae615757a8725e52d9/297_329_2974_1784/master/2974.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=54907bf26973da8d098262abe333b802"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white/10 rounded-lg mt-18 mr-5 mb-5 flex flex-row overflow-hidden">
        <div className="w-64 bg-white/10"></div>
        <div className="flex-1 max-h-full overflow-y-auto">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item) => (
            <div key={item} className="p-5">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-96 bg-white/10 rounded-lg mt-18 mr-5 mb-5">
        <ChatUI />
      </div>
    </div>
  );
}
