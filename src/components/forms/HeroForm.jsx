"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HeroForm = ({ user }) => {
  const router = useRouter();
  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector("input");
    const username = input.value;
    if (username.length > 0) {
      if (user) {
        router.push("/account/?desiredUsername=" + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex shadow-lg shadow-gray-500/20 items-center bg-white"
    >
      <span className="bg-white py-4 pl-4">linklist.to/</span>
      <input type="text" 
      style={{backgroundColor: "white", marginBottom: 0, border: "0", paddingLeft: "0"}}
      placeholder="username" />
      <button type="submit" className="text-white bg-blue-500 py-4 px-6 whitespace-nowrap">
        Join For Free
      </button>
    </form>
  );
};

export default HeroForm;
