import Link from "next/link";

export default function Home() {
  return (
    <div id="root">
      <a href="https://www.wikipedia.org">Wikipedia</a>
      <Link href="/about">
        <button>Hello</button>
      </Link>
      
    </div>
  )
}
