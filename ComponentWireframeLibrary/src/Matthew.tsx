import React, { useState } from "react";
import parse from "html-react-parser";

const Matthew = () => {
  // const [code, setCode] = useState("<h1 class=text-rose-500>INI CODINGAN</h1>");
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
  // const [aspVideo, setAspVideo] = useState("aspect-video");
  const [aspVideo, setAspVideo] = useState("desktop");

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="p-10">Code</h1>
      <div className="flex p-10">
        <button onClick={() => setAspVideo("desktop")}>16:9</button>
        <button onClick={() => setAspVideo("mobile")}>9:16</button>
      </div>

      <div className="container flex justify-center">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ resize: "none" }}
        />

        <div className={`canvas bg-white w-full ${aspVideo}`}>
          {parse(code)}
        </div>
      </div>
      {/* <button onClick={() => setAspVideo("aspect-video")}>16:9</button> */}
      {/* <button onClick={() => setAspVideo("aspect-4/3")}>4:3</button> */}
      {/* <button onClick={() => setAspVideo("aspect-9/16")}>9:16</button> */}
    </div>
  );
};

export default Matthew;
