import Image from "next/image";
import img1 from "@/public/about-1.jpg";
import img2 from "@/public/about-2.jpg";
import Explore from "@/app/_components/Explore";
import { getCabins } from "@/app/_lib/services";

export const metadata: { title: String } = {
  title: "About",
};

export const revalidate = 86400;

export default async function Page(): Promise<JSX.Element> {
  const cabins = await getCabins();

  return (
    <main className="flex flex-col gap-28">

      <section className="flex flex-wrap gap-12 md:grid md:grid-cols-5 items-center p-8">
        <div className="flex flex-col gap-6 text-lg pt-3 col-start-1 col-span-3">
          <h2 className="text-4xl text-accent-400">
            Welcome to The Wild Oasis
          </h2>
          <p>
            Where nature &#39;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it &#39;s not just about the luxury
            cabins. It &#39;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>

          <p>
            Our {cabins?.length} luxury cabins provide a cozy base, but the real freedom and
            peace you&#39;ll find in the surrounding mountains. Wander through
            lush forests, breathe in the fresh air, and watch the stars twinkle
            above from the warmth of a campfire or your hot tub.
          </p>

          <p>
            This is where memorable moments are made, surrounded by nature&#39;s
            splendor. It&#39;s a place to slow down, relax, and feel the joy of
            being together in a beautiful setting.
          </p>
        </div>

        <Image
          src={img1}
          alt="family setting around a fire pit in front of cabin"
          className=" col-start-4 col-span-2"
          placeholder="blur"
        />
      </section>

      <section className="flex flex-wrap-reverse gap-12 md:grid md:grid-cols-5 items-center p-8">
        <Image
          src={img2}
          alt="family that manges the wild oasis hotel"
          className=" col-start-1 col-span-2"
          placeholder="blur"
        />

        <div className="flex flex-col gap-6 text-lg pt-3 col-start-3 col-span-3">
          <h2 className="text-4xl text-accent-400">
            Managed by our family since 1962
          </h2>

          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>

          <p>
            Over the years, we&#39;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&#39;re not just a
            guest; you&#39;re part of our extended family. So join us at The Wild
            Oasis soon, where tradition meets tranquility, and every visit is
            like coming home.
          </p>

          <Explore />
        </div>
      </section>
    </main>
  );
}
