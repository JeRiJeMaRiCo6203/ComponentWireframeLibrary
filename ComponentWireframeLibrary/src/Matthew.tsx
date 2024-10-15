import React, { useState } from "react";
import parse from "html-react-parser";

const Matthew = () => {
  const [code, setCode] =
    useState(`<h1 class="text-slate-900 bg-blue-900">Form Pendaftaran</h1>

    <form class="flex flex-col" action="">
        <label for="fname" class="text-slate-900">First name:</label>
        <input type="text" id="fname" name="fname" value="John">
        <label for="lname" class="text-slate-900">Last name:</label>
        <input type="text" id="lname" name="lname" value="Doe">
        <input type="submit" class="bg-black" value="Submit">
    </form>
`);
  const [aspVideo, setAspVideo] = useState("desktop");

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-8xl p-10 font-bold">CODE</h1>
      <div className="flex p-10">
        <button
          className="bg-slate-900 text-slate-50 font-bold px-9 py-3 rounded-3xl"
          onClick={() => setAspVideo("desktop")}
        >
          16:9
        </button>
        <button
          className="bg-slate-900 text-slate-50 font-bold px-9 py-3 rounded-3xl"
          onClick={() => setAspVideo("mobile")}
        >
          9:16
        </button>
      </div>

      <div className="container flex justify-center">
        <textarea
          className="border-2 border-slate-900"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ resize: "none" }}
        />

        <div
          className={`canvas bg-white w-full border-2 border-slate-900 ${aspVideo}`}
        >
          {parse(code)}
        </div>
      </div>
    </div>
  );
};

export default Matthew;
