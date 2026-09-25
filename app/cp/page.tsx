import type { Metadata } from "next";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { RatingChart } from "@/components/charts";
import { Colonnade } from "@/components/cp/colonnade";
import { contests, cpSnapshot, judges } from "@/content/record";
import { getCodeforcesProfile, rankTitle } from "@/lib/codeforces";

export const metadata: Metadata = {
  title: "CP Journey",
  description:
    "Eyasir Ahamed’s competitive programming record: ICPC Dhaka Regional, Codeforces rating history and more.",
};

export const revalidate = 86400;

const fmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Dhaka",
});

export default async function CpPage() {
  const cf = await getCodeforcesProfile("eyasir329", cpSnapshot.codeforcesMax);
  const cfMax = cf.maxRating ?? cpSnapshot.codeforcesMax;

  return (
    <Container>
      <PageHeader
        kicker="CP Journey"
        title="The contest record"
        lede="Competitive programming is where I practise thinking under pressure: estimate the cost, find the edge case, write it correctly the first time."
      >
        <dl className="border-rule mt-10 grid grid-cols-2 border-y md:grid-cols-4">
          {[
            [cpSnapshot.solvedLabel, "problems solved"],
            ["112th", "ICPC Dhaka ’25, of 300+"],
            [String(cfMax), `Codeforces max · ${rankTitle(cfMax)}`],
            ["10+", "onsite contests"],
          ].map(([f, l], i) => (
            <div
              key={l}
              className={`border-rule flex flex-col py-5 ${i % 2 ? "border-l pl-5" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-5" : ""}`}
            >
              <dt className="kicker order-2 mt-1">{l}</dt>
              <dd className="text-ink serial -order-1 font-serif text-4xl">{f}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section aria-labelledby="contests" className="mt-4">
        <SectionHeading n={1} kicker="Onsite contests" title="Where it counted" id="contests" />
        <ol className="mt-6">
          {contests.map((c) => (
            <li
              key={c.name}
              className={`border-rule grid gap-2 border-b py-6 md:grid-cols-12 md:gap-6 ${c.featured ? "bg-accent-wash -mx-3 px-3" : ""}`}
            >
              <span className="serial text-muted md:col-span-2">{c.date}</span>
              <div className="md:col-span-6">
                <h3 className={c.featured ? "text-2xl" : "text-lg"}>{c.name}</h3>
                {c.host && <p className="text-muted text-sm">Host: {c.host}</p>}
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className={c.featured ? "text-accent font-medium" : ""}>{c.result}</p>
                {c.detail && <p className="text-muted text-sm">{c.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="codeforces" className="mt-20">
        <SectionHeading
          n={2}
          kicker="Codeforces · eyasir329"
          title="Rating history"
          id="codeforces"
          link={{ href: judges[0]!.href, label: "Profile" }}
        />
        {cf.history.length > 1 ? (
          <>
            <div className="mt-8">
              <RatingChart history={cf.history} />
            </div>
            <Colonnade ratings={cf.history.map((h) => h.rating)} />
            <details className="mt-8">
              <summary className="link cursor-pointer text-sm">View as table ({cf.history.length} contests)</summary>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <caption className="sr-only">Codeforces rating after each rated contest</caption>
                  <thead className="kicker">
                    <tr className="border-rule border-b">
                      <th scope="col" className="py-2 font-medium">
                        Date
                      </th>
                      <th scope="col" className="py-2 font-medium">
                        Contest
                      </th>
                      <th scope="col" className="py-2 text-right font-medium">
                        Rank
                      </th>
                      <th scope="col" className="py-2 text-right font-medium">
                        Rating
                      </th>
                      <th scope="col" className="py-2 text-right font-medium">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody className="serial">
                    {cf.history.map((h) => (
                      <tr key={h.contestId} className="border-rule border-b">
                        <td className="py-2 pr-4 whitespace-nowrap">{fmt.format(new Date(h.date))}</td>
                        <td className="py-2 pr-4 font-sans">{h.contest}</td>
                        <td className="py-2 text-right">{h.rank}</td>
                        <td className="py-2 text-right">{h.rating}</td>
                        <td className={`py-2 text-right ${h.delta >= 0 ? "text-success" : "text-accent"}`}>
                          {h.delta >= 0 ? "+" : ""}
                          {h.delta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        ) : (
          <p className="text-muted max-w-measure mt-8">
            Max rating {cfMax} ({rankTitle(cfMax)}). The full rating history loads from the Codeforces API; it isn’t
            available right now, so this shows the last recorded figure. See the{" "}
            <a href={judges[0]!.href} className="link" target="_blank" rel="noreferrer">
              live profile
            </a>
            .
          </p>
        )}
        <p className="text-muted mt-6 text-xs">
          {cf.live && cf.fetchedAt
            ? `Synced from the Codeforces API · as of ${fmt.format(new Date(cf.fetchedAt))}`
            : `Last recorded: ${cpSnapshot.asOf}`}
        </p>
      </section>

      <section aria-labelledby="method" className="mt-20">
        <SectionHeading n={3} kicker="Method" title="How I train" id="method" />
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            [
              "Topic by topic",
              "I work through a structured syllabus, the same one I designed for my club, and write notes as I go.",
            ],
            [
              "Upsolve everything",
              "After a contest, every unsolved problem gets solved and written up. That’s where most learning happens.",
            ],
            ["Teach it", "Running practice contests and sessions for the club forces me to explain ideas precisely."],
          ].map(([t, b]) => (
            <div key={t} className="border-accent border-l-2 pl-5">
              <h3 className="text-lg">{t}</h3>
              <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
