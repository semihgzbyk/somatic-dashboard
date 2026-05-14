import DashboardShell from "@/components/layout/dashboard-shell";

type MetricCardProps = {
  title: string;
  value: string;
  subtitle: string;
  tone?: "default" | "success" | "warning";
};

function MetricCard({
  title,
  value,
  subtitle,
  tone = "default",
}: MetricCardProps) {
  const toneClass =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50"
      : tone === "warning"
      ? "border-amber-200 bg-amber-50"
      : "border-slate-200 bg-white";

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${toneClass}`}>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function ProgressRow({
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
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-medium text-slate-900">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${barClass}`} style={{ width }} />
      </div>
    </div>
  );
}

function RuleRow({
  label,
  value,
  badge,
  badgeClass,
}: {
  label: string;
  value: string;
  badge: string;
  badgeClass: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-slate-50 px-4 py-4">
      <div>
        <div className="text-sm font-semibold text-slate-900">{label}</div>
        <div className="mt-1 text-sm text-slate-500">{value}</div>
      </div>

      <span
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
      >
        {badge}
      </span>
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
    <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default function QcPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Quality Control
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                FASTQ ve BAM istatistikleri teknik güvenilirlik açısından bu modülde
                değerlendirilir. Kalite uygunluğu ve örnek yeterliliği burada görülür.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                statistic_detail.xls
              </span>
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                PASS
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Raw Reads"
              value="52.4M"
              subtitle="Ham okuma sayısı"
            />
            <MetricCard
              title="Clean Reads"
              value="50.8M"
              subtitle="Temizlenmiş okuma sayısı"
            />
            <MetricCard
              title="Q20"
              value="97.9%"
              subtitle="Baz kalite seviyesi"
              tone="success"
            />
            <MetricCard
              title="Q30"
              value="91.7%"
              subtitle="Yüksek kalite baz oranı"
              tone="success"
            />
            <MetricCard
              title="GC"
              value="49.1%"
              subtitle="GC dağılımı dengeli"
            />
            <MetricCard
              title="Mapped Rate"
              value="98.1%"
              subtitle="Hizalama oranı güçlü"
              tone="success"
            />
            <MetricCard
              title="Target Mean Depth"
              value="684x"
              subtitle="Panel geneli derinlik"
              tone="success"
            />
            <MetricCard
              title="Low Coverage Genes"
              value="6"
              subtitle="Coverage modülünde detay"
              tone="warning"
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    FASTQ / BAM performans görünümü
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Teknik kalite metriklerinin görsel özeti
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700">
                  Stable
                </span>
              </div>

              <div className="mt-5 space-y-5">
                <ProgressRow label="Q20" value="97.9%" width="97.9%" tone="green" />
                <ProgressRow label="Q30" value="91.7%" width="91.7%" tone="green" />
                <ProgressRow
                  label="Mapped Rate"
                  value="98.1%"
                  width="98.1%"
                  tone="green"
                />
                <ProgressRow
                  label="20X Coverage"
                  value="99.2%"
                  width="99.2%"
                  tone="green"
                />
                <ProgressRow
                  label="Normalized Depth Stability"
                  value="93.4%"
                  width="93.4%"
                  tone="blue"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    QC özeti
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Teknik uygunluk ve genel örnek durumu
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  Summary
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <SummaryRow label="Overall QC Status" value="PASS" />
                <SummaryRow label="Sequencing Quality" value="Strong" />
                <SummaryRow label="Alignment Quality" value="Strong" />
                <SummaryRow label="Depth Stability" value="Acceptable" />
                <SummaryRow label="Coverage Risk" value="Low to moderate" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    QC karar kuralları
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Konfigüre edilebilir kalite eşiklerine göre sınıflandırma
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700">
                  Rule engine
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <RuleRow
                  label="Q30 ≥ 85"
                  value="Q30 değeri kabul eşik üstünde"
                  badge="PASS"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <RuleRow
                  label="Mapping Rate ≥ 95"
                  value="Hizalama oranı güçlü"
                  badge="PASS"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <RuleRow
                  label="Target Mean Depth ≥ 500x"
                  value="Panel genelinde derinlik yeterli"
                  badge="PASS"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <RuleRow
                  label="Low Coverage Gene Count < 10"
                  value="Düşük coverage gen var ama kritik limit aşılmadı"
                  badge="Warning"
                  badgeClass="border-amber-200 bg-amber-50 text-amber-700"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Teknik değerlendirme notu
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Klinik yorum öncesi kalite bakışı
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700">
                  Ready
                </span>
              </div>

              <div className="mt-5 rounded-2xl border bg-white p-5">
                <p className="text-sm leading-7 text-slate-600">
                  Mevcut örnek kalite metrikleri, varyant yorumlama için genel olarak
                  uygundur. Yine de düşük coverage genler için negatif bulgular
                  coverage modülü ile birlikte dikkatle değerlendirilmelidir.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">
                  Önerilen yorum akışı
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <div>• Önce genel QC uygunluğu doğrulanır</div>
                  <div>• Sonra low coverage bölgeler coverage modülünde incelenir</div>
                  <div>• Ardından varyantlar klinik ve teknik birlikte yorumlanır</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}