import DashboardShell from "@/components/layout/dashboard-shell";

function ReportSectionRow({
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
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-white px-4 py-4">
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

function ExportCard({
  title,
  subtitle,
  buttonLabel,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="text-base font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>

      <button className="mt-5 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
        {buttonLabel}
      </button>
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

function WorkflowStep({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border bg-white px-4 py-4">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-500">{subtitle}</div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                Reports & Export
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Bu modül nihai rapor içeriğini yapılandırmak, export tiplerini
                göstermek ve klinik / teknik özetleri paylaşılabilir hale getirmek
                için tasarlanmıştır.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Report builder
              </span>
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Ready
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Rapor içeriği
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Nihai raporda yer alacak ana bölümler
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  Structure
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <ReportSectionRow
                  title="Sample metadata"
                  subtitle="Örnek adı, panel adı, pipeline sürümü ve teknik kimlik bilgileri"
                  badge="Hazır"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <ReportSectionRow
                  title="QC özeti"
                  subtitle="Q30, mapping rate, depth ve kalite sınıflandırması"
                  badge="Hazır"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <ReportSectionRow
                  title="Coverage özeti"
                  subtitle="Düşük coverage genler ve dikkat gerektiren bölgeler"
                  badge="Hazır"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <ReportSectionRow
                  title="Clinically relevant variants"
                  subtitle="Öncelikli ve raporlanabilir varyant listesi"
                  badge="Hazır"
                  badgeClass="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
                <ReportSectionRow
                  title="Technical notes"
                  subtitle="Teknik yorum ve kısıt bilgileri"
                  badge="Düzenlenebilir"
                  badgeClass="border-amber-200 bg-amber-50 text-amber-700"
                />
                <ReportSectionRow
                  title="Audit trail / version"
                  subtitle="Versiyon ve izlenebilirlik alanı"
                  badge="Sonraki faz"
                  badgeClass="border-blue-200 bg-blue-50 text-blue-700"
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Rapor özeti
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Bu örnek için rapor üretim durumu
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700">
                  High readiness
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <SummaryRow label="Sample" value="K1GZ" />
                <SummaryRow label="Reportable variants" value="8" />
                <SummaryRow label="Low coverage genes" value="6" />
                <SummaryRow label="QC status" value="PASS" />
                <SummaryRow label="Confidence score" value="78" />
                <SummaryRow label="Export readiness" value="High" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            <ExportCard
              title="PDF Report"
              subtitle="Klinik veya laboratuvar paylaşımı için düzenli ve okunabilir nihai rapor çıktısı."
              buttonLabel="PDF oluştur"
            />

            <ExportCard
              title="CSV Export"
              subtitle="Varyant, coverage veya özet metrikleri tablo biçiminde dışarı aktarmak için."
              buttonLabel="CSV indir"
            />

            <ExportCard
              title="JSON Export"
              subtitle="Backend, entegrasyon veya başka sistemlerle veri alışverişi için yapılandırılmış çıktı."
              buttonLabel="JSON üret"
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Teknik not alanı
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Rapor öncesi düzenlenebilir yorum alanı
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-medium text-amber-700">
                  Editable
                </span>
              </div>

              <div className="mt-5 rounded-2xl border bg-white p-5">
                <p className="text-sm leading-7 text-slate-600">
                  Mevcut örnek kalite metrikleri genel olarak uygundur. Düşük coverage
                  genler için negatif bulgular coverage modülü ile birlikte dikkatle
                  değerlendirilmelidir. Nihai klinik yorum öncesi teknik kısıtlar bu
                  alanda özelleştirilebilir.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Rapor iş akışı
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Nihai rapora gitmeden önce önerilen akış
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                  Workflow
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <WorkflowStep
                  title="1. QC kontrolü"
                  subtitle="Teknik kalite yeterli mi kontrol edilir"
                />
                <WorkflowStep
                  title="2. Coverage değerlendirmesi"
                  subtitle="Düşük confidence bölgeler incelenir"
                />
                <WorkflowStep
                  title="3. Variant review"
                  subtitle="Klinik ve teknik yorum birleştirilir"
                />
                <WorkflowStep
                  title="4. Final export"
                  subtitle="PDF / CSV / JSON çıktı hazırlanır"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}