import Link from "next/link";
import { PageHero, Shell } from "../components/site";
export default function NotFound() {
  return (
    <Shell>
      <PageHero
        kicker="404 · Beyond the map"
        title="This gate is not marked."
        intro="The page may have moved, or the path may not yet belong to the library."
      />
      <div className="not-found-actions">
        <Link className="button gold" href="/">
          Return home
        </Link>
        <Link className="button dark" href="/search">
          Search the library
        </Link>
      </div>
    </Shell>
  );
}
