import DashboardShell from "@/components/layout/dashboard-shell";

function CoverageCard({
  gene,
  depth,
  coverage,
  status,
}: {
  gene: string;
  depth: string;
  coverage: string;
  status: "good" | "mid" | "low";
}) {
  const tone =
    status === "good"
      ? "border-emerald-200 bg-emerald-50"
      : status === "mid"
      ? "border-amber-200 bg-amber-50"
      : "border-red-200 bg-red-50";

  return (
    <div className={`rounded-2xl border p-4 ${tone}`}>
      <div className="text-sm font-semibold text-slate-900">{gene}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {depth}
      </div>
      <div className="mt-1 text-sm text-slate-600">Coverage {coverage}</div>
    </div>
  );
}

function WarningRow({
  title,
  subtitle,
  badge,
  badgeClass,
}: {
  title: string;
  subtitle: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-slate-50 px-4 py-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
      </div>

      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
      >
        {badge}
      </span>
    </div>
  );
}

export default function CoveragePage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex rounded-full border bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                Coverage Module
              </span>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                Coverage & confidence
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                Bu ekran gen bazlı okunabilirlik, düşük kapsama bölgeleri ve
                negatif bulgunun güvenilirliğini etkileyebilecek alanları gösterir.
              </p>
            </div>

            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              6 düşük coverage gen
            </span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Gen bazlı coverage
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Hedef genlerin derinlik ve coverage görünümü
                </p>
              </div>

              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                regioncount.xls
              </span>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <CoverageCard
                gene="TP53"
                depth="812x"
                coverage="99.4%"
                status="good"
              />
              <CoverageCard
                gene="PIK3CA"
                depth="744x"
                coverage="98.8%"
                status="good"
              />
              <CoverageCard
                gene="BRCA2"
                depth="126x"
                coverage="91.2%"
                status="mid"
              />
              <CoverageCard
                gene="ATM"
                depth="84x"
                coverage="87.6%"
                status="low"
              />
              <CoverageCard
                gene="NF1"
                depth="69x"
                coverage="82.1%"
                status="low"
              />
              <CoverageCard
                gene="KRAS"
                depth="905x"
                coverage="99.7%"
                status="good"
              />
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Dikkat gerektiren bölgeler
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Negatif bulgunun güvenilirliğini etkileyebilecek alanlar
                </p>
              </div>

              <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                Manual review
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <WarningRow
                title="ATM exon 12"
                subtitle="Mean depth 84x · 20X coverage 88%"
                badge="Warning"
                badgeClass="border-amber-200 bg-amber-50 text-amber-700"
              />
              <WarningRow
                title="NF1 exon 4"
                subtitle="Mean depth 69x · panel threshold altında"
                badge="Low confidence"
                badgeClass="border-red-200 bg-red-50 text-red-700"
              />
              <WarningRow
                title="BRCA2 exon 20"
                subtitle="Coverage 91.2% · klinik yorumda dipnot gerekebilir"
                badge="Report note"
                badgeClass="border-amber-200 bg-amber-50 text-amber-700"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}