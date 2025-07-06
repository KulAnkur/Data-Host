import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/data/projects';       // or projectRegistry model
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Plot from 'react-plotly.js';

/* ------------------------------------------------------------------ */
/*  ⬇️  Paste ONLY your Plotly "Embed" code between the back‑ticks.    */
/*      You can use either the <iframe …> snippet or the full          */
/*      <div id="plotly-chart">…<script>… Plotly.newPlot() …</script>  */
/*      bundle from Chart Studio.                                      */
const PLOTLY_EMBED = `
<iframe
  src="https://plotly.com/~yourUser/42.embed"
  style="width:100%;height:100%;border:none;"
  title="LA Rent Trends Pre/Post Fires"
  loading="lazy"
></iframe>
`;
/* ------------------------------------------------------------------ */

interface LARentalProjectProps {
  project: Project;              // provided by your ProjectWrapper
}

const LARentalProject: React.FC<LARentalProjectProps> = ({ project }) => {
  React.useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mt-4 mb-6">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted" type="button">
              <ChevronLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* ------------- header ----------------------------------- */}
        <div className="mb-12">
          <div className="rounded-lg overflow-hidden h-64 md:h-96 mb-6">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground">{project.date}</p>

            <div className="flex flex-wrap gap-2 my-4">
              {project.category.map((cat, i) => (
                <Badge key={i} variant="secondary" className="font-normal">
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 text-sm text-foreground/60 mb-6">
              <span className="font-semibold">Tools used:</span>
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="after:content-['•'] after:mx-1 last:after:content-none"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ------------- content grid ----------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* ---- main column ---- */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              On January 7, 2025, devastating wildfires in Los Angeles County destroyed an estimated 10,000 homes. This disaster immediately shook the county's housing market. An analysis of housing listing data for LA County cities reveals several clear, smoothed trends in the aftermath of the fires. Each trend below shows a marked shift around the time of the fire event, indicating the wildfires' impact on housing.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Key Findings</h2>
            <ol className="list-decimal pl-5 mb-8 space-y-4 text-foreground/80">
              <li>
                <strong>Surge in New Housing Listings After the Fires:</strong> In the weeks following the fires, new housing listings skyrocketed across LA County. Data shows a jump from only a few hundred new listings per week in late 2024 to well over a thousand per week by late January 2025. This surge is visualized in the chart below, with a rolling average of daily new listings illustrating a steep rise starting mid-January. Homeowners quickly responded to the sudden housing demand by bringing more units to market, but the influx was not enough to fully relieve pressure.
              </li>
              <li>
                <strong>Spike in Housing Prices and Rates:</strong> Median asking prices spiked sharply after January 7, 2025. A smoothed 30-day rolling average of listed prices shows a clear inflection: prices were relatively stable through late 2024, then jumped significantly in mid-January 2025 and remained elevated. In some areas, prices doubled or even tripled after the fires, reflecting a classic post-disaster price surge driven by thousands of displaced families competing for a limited pool of housing.
              </li>
              <li>
                <strong>Shift in Housing Stock Composition (More Single-Family Homes):</strong> The composition of housing listed changed after the fires, with single-family homes making up a greater share of listings. By February–March 2025, single-family housing constituted roughly one-third of all new listings (up from around 15–20% the year before). This trend suggests that more individual homeowners entered the housing market after the fires, and affluent neighborhoods saw especially large price increases.
              </li>
              <li>
                <strong>Tighter Market: Faster Turnover and Fewer Price Cuts:</strong> Housing units were snatched up faster after the fires, as evidenced by a sharp drop in the need for price reductions. By Feb 2025, only ~20% of new listings showed any price reduction during their listing period, compared to over 50% in late 2024. Most post-fire listings were selling at or above initial asking price, with little delay.
              </li>
              <li>
                <strong>County-Wide Ripple Effects (Not Just Fire Zones):</strong> The housing market shifts were observed broadly across Los Angeles County, not only in the immediate burn areas. Even communities geographically distant from the fires experienced unusual spikes in demand and prices, as displaced residents spread out across the county in search of available housing.
              </li>
            </ol>

            {/* ---- first graph: Interactive Plotly Chart ---- */}
            <h2 className="text-2xl font-semibold mb-6">Data Visualizations</h2>
            
            {/* --- Added static plots --- */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">New Rental Listings After the Fires</h3>
              <img
                src={`${import.meta.env.BASE_URL}LA-Fire-images/new_rental_listings.png`}
                alt="New Rental Listings After the Fires"
                className="w-full rounded-lg border shadow mb-2"
                style={{ maxWidth: 600 }}
              />
              <p className="text-sm text-muted-foreground mb-6">
                This plot shows the surge in new rental listings in LA County following the January 2025 wildfires. The spike in listings reflects the rapid response of homeowners to increased housing demand.
              </p>
              <h3 className="text-xl font-semibold mb-2">Property Type Distribution Post-Fire</h3>
              <img
                src={`${import.meta.env.BASE_URL}LA-Fire-images/property_type.png`}
                alt="Property Type Distribution Post-Fire"
                className="w-full rounded-lg border shadow mb-2"
                style={{ maxWidth: 600 }}
              />
              <p className="text-sm text-muted-foreground">
                This plot illustrates the shift in housing stock composition after the fires, with single-family homes making up a greater share of new listings.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Conclusion</h2>
            <p className="text-foreground/80 mb-6">
              In summary, the January 7, 2025 LA fires acted as an inflection point for the housing market. Key metrics — from supply (listing counts) and price levels to market speed and composition — all show smooth but dramatic shifts aligning with the fire emergency. The data paints a clear picture: housing inventory surged but was instantly absorbed, pushing prices to illegal highs and eliminating the need for concessions. Single-family homes became a larger part of the housing mix as owners stepped in to fill the housing void. These trends were county-wide, reflecting how displacement-driven demand overwhelmed the entire LA housing ecosystem. Ultimately, the post-fire period saw record-high prices and a frenzied scramble for housing.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Sources: Recent analyses and news reports on the LA fires' housing impact (washingtonpost.com, foxweather.com), combined with the Zillow housing listing dataset (August 2023–April 2025).
            </p>
          </div>

          {/* ---- sticky sidebar ---- */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-muted/50 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Project Details</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Project Date</h4>
                  <p>{project.date}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Categories</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.category.map((cat, i) => (
                      <span key={i} className="text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Tools & Tech</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LARentalProject;
