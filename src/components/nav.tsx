import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between bg-[#226E18] px-8 py-4 text-white">
      <div className="font-medium">
        <Link href="/" className="flex items-center hover:opacity-60">
          <img src="/logos/singletree.svg" alt="ascot tree logo" className="h-15"></img>
          <div className="mx-4">
            <p className="font-bold text-xl">Micro-Forest</p>
            <p className="font-bold text-xl">Connect</p>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <Link href="/map"><p className="font-bold text-lg hover:opacity-60">Map</p></Link>
        <Link href="/microforests"><p className="font-bold text-lg hover:opacity-60">Micro-Forests</p></Link>
        <Link href="/about"><p className="font-bold text-lg hover:opacity-60">About</p></Link>
        <Link href="/faq"><p className="font-bold text-lg hover:opacity-60">FAQ</p></Link>
        <Link href="/contact"><p className="font-bold text-lg hover:opacity-60">Contact</p></Link>
      </div>
    </nav>
  );
}
