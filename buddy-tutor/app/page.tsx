import { Navbar } from "./_components/navbar";
import { SignInPage } from "./_components/sign_in_page";

export default function Home() {
  return (
    <main className="">
      <div className="relative h-[128px] w-full">
        <Navbar />
      </div>
      <div>
        <SignInPage />
      </div>
    </main>
  );
}
