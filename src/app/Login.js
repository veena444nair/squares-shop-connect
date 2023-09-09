"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "./Loading";

function Login({ link, codeVerifier }) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code") && !searchParams.get("codeVerifier")) {
      const params = new URLSearchParams(searchParams);
      params.set("codeVerifier", sessionStorage.getItem("codeVerifier"));
      router.push(process.env.NEXT_PUBLIC_BASE_URL + "?" + params);
    } else {
      sessionStorage.setItem("codeVerifier", codeVerifier);
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-slate-100  h-full">
      <div className="bg-black w-1/2 h-screen flex justify-center items-center">
        <Link
          href={link}
          className="bg-white shadow-xl hover:shadow-2xl w-72 px-6 py-5 rounded-lg text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        >
          <div className="flex items-center justify-center group transform transition-transform hover:scale-110">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAZlBMVEX///8jHyAAAAAbFxj39/dDQ0P8/PxgYGDBwcGvr68UDxHR0dFLSkq9vb24uLgaFRY0MjJBPj/Ix8hzcXHj4+Pp6elXVVZnZmZ6eXmMioqUlJQsKys4NzilpaXb29spJSYLAAOdnZ1u9vaAAAACpklEQVR4nO3ci5KaMBhAYRMQMKARxQte8f1fsmyn25kudJ1K8gfp+R4g4xkgoJLMZgAAAAAAAAAAAAAAAADQip0IXdHK67SYO1GkpzxkSXI6G2MiR9qhLtdgKVetI+WU1XqVhGiJC+225KdIbwNcPbe7j5aWLnbiLRfjp0WppqhkW6q9txalzEH02MS1x5b2wjlJzgLLs+Np7E+23Mi17LaeLv5Pupab0jKvJ1nLrsUeBuKT5wPTHpqFVIzXqexXzFZqQssb3y3KXm5CMZn3s6w9NFIXzUoiRmhyThYSMVnImPbp/VV9N+CgMXp92uQvyepzz4QSMqY5VC/fs+PbvlsTMMbsBz1+VEXnxhUw5rwcNuR1REcmmg98ZN9dvk4CAWOKgUPG8wnFJMS4QMyTIYlxgZgnQxLjAjFPhiTGhf8xJslWvTY9T9hjj0m2l3Wvsu7WjD3mof/yP6zVq+6QI4/pfhP+/Tm33SGJcYEYYgQQQ4wAYogRQAwxAoghRgAxxAgg5r1jet66+Pycx+6QI49ZaGN7mZ7POfaYpC7KXsXj/X7RnCX5plf+hr81/9uQxLhAzJMhiXGBmCdDEuMCMU+GJMYFYr43qrdnh77XXI3ovWZ1H7hE7PF1wLBrAQYtEbvN7YhiVJPmLy9t2OXjWqXR1pzrxfIli+N9ZOtnprWyyTWpmEmtBpxtprROMzdeF9B/sKXUCtoq9b+2+Si1tjl+TGjV+WyjPJ9ntpTbHGh39HxoGsGdGmbZ2uuhMYXkrk1+dzeJ1EOwpT3RUo8bHDTSOxxVpbcaPez7xCt2Z297NYXYty11vSHYB9vzj6eIZWSs057IGrkNZ75KrsVaGWfUei934++TP46H1InD8Sr1cPmdyezWCAAAAAAAAAAAAAAAALyrH5BeTU4vOPm3AAAAAElFTkSuQmCC"
              className="w-12 "
            />
            <div className="text-1xl font-semibold ">Login With Square</div>
          </div>
        </Link>
      </div>
      {loading && <Loading />}
    </div>
  );
}

export default Login;
