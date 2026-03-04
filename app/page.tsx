import Containers from "@/components/containers";
import Herobanner from "@/components/Herobanner";






export default async function Home () {
  
  
  
  return (
   <>
    <Herobanner />
    <Containers />
    <footer className="w-full h-16 bg-black text-white flex items-center justify-center">
      2025 &copy; All rights reserved by <span className="unifrakturmaguntia-regular">chebem</span>
    </footer>
   </>
  );
}
