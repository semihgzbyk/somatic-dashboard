import DashboardShell from "@/components/layout/dashboard-shell";

type StatCardProps = {
  label: string;
  value: string;
  note: string;
  tone?: "default" | "success" | "warning" | "danger";
};

function StatCard({
  label,
  value,
  note,
  tone = "default",
}: StatCardProps) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50"
      : tone === "warning"
      ? "border-amber-200 bg-amber-50"
      : tone === "danger"
      ? "border-red-200 bg-red-50"
      : "border-slate-200 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${toneClass}`}>
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <div className="mt-2 text-sm text-slate-500">{note}</div>
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  width,
  tone = "blue",
}: {
  label: string;
  value: string;
  width: string;
  tone?: "blue" | "green" | "amber" | "red";
}) {
  const barClass =
    tone === "green"
      ? "bg-emerald-600"
      : tone === "amber"
      ? "bg-amber-500"
      : tone === "red"
      ? "bg-red-500"
      : "bg-blue-600";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-900">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${barClass}`} style={{ width }} />
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function VariantPreview({
  gene,
  detail,
  badge,
  badgeClass,
}: {
  gene: string;
  detail: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-white px-4 py-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">{gene}</div>
        <div className="mt-1 text-sm text-slate-500">{detail}</div>
      </div>
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
      >
        {badge}
      </span>
    </div>
  );
}

function InsightRow({
  title,
  description,
  badge,
  badgeClass,
}: {
  title: string;
  description: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-white px-4 py-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{description}</div>
      </div>
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
      >
        {badge}
      </span>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Executive summary */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-4xl">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                Executive Overview
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
                Somatik analiz özeti
              </h1>

              <p className="mt-3 max-w-3xl text-xs leading-6 text-slate-500">
                Bu ekran, teknik yeterlilik, öne çıkan varyantlar ve coverage durumunu tek bakışta özetleyerek detaylara geçmeden önce hızlı bir karar çerçevesi sunar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                QC PASS
              </span>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Confidence 78
              </span>
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                6 low coverage gene
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Anlamlı varyant"
              value="54"
              note="Yorumlanabilir toplam varyant"
            />
            <StatCard
              label="Raporlanabilir aday"
              value="8"
              note="Klinik önceliği yüksek adaylar"
              tone="success"
            />
            <StatCard
              label="Toplam SNP / InDel"
              value="41 / 13"
              note="VCF istatistikleri ile uyumlu özet"
            />
            <StatCard
              label="Coverage riski"
              value="6 gen"
              note="Negatif bulgu yorumu için dikkat gerekir"
              tone="warning"
            />
          </div>
        </div>

        {/* Core status panels - ORAN BURADA DÜZELTİLDİ: 1.1fr (sol) ve 0.9fr (sağ) */}
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Teknik kalite görünümü
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  FASTQ ve BAM seviyesinden türetilen ana kalite göstergeleri
                </p>
              </div>

              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                statistic_detail.xls
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <ProgressMetric label="Q30" value="91.7%" width="91.7%" tone="green" />
              <ProgressMetric
                label="Mapped Rate"
                value="98.1%"
                width="98.1%"
                tone="green"
              />
              <ProgressMetric
                label="20X Coverage"
                value="99.2%"
                width="99.2%"
                tone="green"
              />
              <ProgressMetric
                label="Normalized Depth Stability"
                value="93.4%"
                width="93.4%"
                tone="blue"
              />
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <SummaryRow label="Raw Reads" value="52.4M" />
              <SummaryRow label="Clean Reads" value="50.8M" />
              <SummaryRow label="GC" value="49.1%" />
              <SummaryRow label="Target Mean Depth" value="684x" />
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Karar özeti
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Teknik ve klinik katmanların birleşik değerlendirmesi
                </p>
              </div>

              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Summary
              </span>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="263.89"
                    strokeDashoffset={263.89 - (263.89 * 78) / 100}
                    strokeLinecap="round"
                    className="text-blue-500"
                  />
                </svg>
                <div className="relative text-center">
                  <div className="text-3xl font-semibold tracking-tight text-slate-900">
                    78
                  </div>
                  <div className="text-xs text-slate-500">Confidence</div>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <SummaryRow label="Overall QC" value="PASS" />
                <SummaryRow label="Variant layer" value="Strong" />
                <SummaryRow label="Coverage layer" value="Moderate risk" />
                <SummaryRow label="Clinical readiness" value="Review ready" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                Yönetici özeti
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Teknik kalite genel olarak güçlü görünmektedir. Klinik yorum için
                uygun bir zemin vardır; ancak düşük coverage genler nedeniyle bazı
                negatif bulgular coverage modülü ile birlikte doğrulanmalıdır.
              </p>
            </div>
          </div>
        </div>

        {/* Actionable findings */}
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Öncelikli varyantlar
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Hızlı klinik inceleme için öne çıkan adaylar
                </p>
              </div>

              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                8 reportable
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <VariantPreview
                gene="TP53 · p.R273C"
                detail="Missense · VAF 34.2% · DP 742 · COSMIC, ClinVar"
                badge="High confidence"
                badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
              />
              <VariantPreview
                gene="PIK3CA · p.E545K"
                detail="Missense · VAF 18.1% · DP 688 · ClinVar"
                badge="Reportable"
                badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
              />
              <VariantPreview
                gene="BRCA2 · p.K3326fs"
                detail="Frameshift · VAF 11.4% · DP 121 · coverage dikkat"
                badge="Review needed"
                badgeClass="border-amber-200 bg-amber-50 text-amber-700"
              />
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                  Operasyonel içgörüler
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Detay modüllere gitmeden önce dikkat edilmesi gereken noktalar
                </p>
              </div>

              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                Action points
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <InsightRow
                title="Coverage review önerilir"
                description="6 düşük coverage gen coverage modülünde ayrı değerlendirilmelidir."
                badge="Coverage"
                badgeClass="border-amber-200 bg-amber-50 text-amber-700"
              />
              <InsightRow
                title="Teknik kalite uygun"
                description="FASTQ/BAM kalite metrikleri örnek yorumunu destekliyor."
                badge="PASS"
                badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
              />
              <InsightRow
                title="Rapor üretimine uygun"
                description="QC ve variant katmanı rapor hazırlığı için yeterli durumda."
                badge="Ready"
                badgeClass="border-blue-200 bg-blue-50 text-blue-700"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}