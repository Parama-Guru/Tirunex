import Link from "next/link";
import { Page } from "@/components/layout/Page";
import { Scene } from "@/components/layout/Scene";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Page>
      <Scene scene={{ shape: "tunnel", core: 0.6, x: 0, zoom: 5.5, tint: "indigo" }} className="relative grid min-h-[100svh] place-items-center px-6 pt-24 text-center">
        <div>
          <p className="eyebrow justify-center">Error 404</p>
          <h1 className="mt-6 font-display text-[28vw] font-bold leading-[0.8] tracking-[-0.06em] text-gradient sm:text-[14rem]">404</h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-fg-soft">This page drifted out of orbit. Let&apos;s get you back to something useful.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/">Back to Home</Button>
            <Link href="/contact" className="rounded-full glass px-6 py-3.5 text-sm font-medium">
              Contact us
            </Link>
          </div>
        </div>
      </Scene>
    </Page>
  );
}
