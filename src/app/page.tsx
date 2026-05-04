import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-[5vw]">
      <h1 className="my-8 text-4xl text-left font-bold text-zinc-700">Ascot Micro-Forest Connect</h1>

      <div className="flex">
        <div className="w-1/2">
        <p className="text-xl mr-6">
          The Ascot Micro-Forest Connect project is a mission to plant micro-forests, build software to support their growth, spread awareness about their benefits, and engage communities to take action through planting some of their own. Supported by Loyola Marymount University and lead by the Willette Lab of Applied Ecology. <br /> <br />

          This interactive site will help you explore local micro-forests, learn what has been planted, and stay connected to restoration efforts across the community! Use the map to find active forests, view key details for each location, and follow project progress over time. You can also browse educational resources and project updates to better understand how micro-forests support biodiversity, improve soil health, and strengthen climate resilience.
        </p>
        <Link
          href="/map"
          className="mt-6 inline-block rounded-md bg-[#226E18] px-5 py-3 font-semibold text-white hover:opacity-90"
        >
          View Our Map
        </Link>
      

        </div>

        <div className="w-1/2">
          <Image 
            src="/splash/lsb.jpg"
            alt="photo of lmu life science building" 
            height={700} 
            width={1200}
            className="rounded-md"></Image>

        </div>
      </div>

     
    </div>
  );
}
