import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-bold">FlatBuddy Backend</h1>
      <p className="text-2xl font-semibold text-muted-foreground">BuildingFullThrotle LLC</p>
    </div>
  );
}
