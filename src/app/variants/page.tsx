"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";

type VariantRow = {
  gene: string;
  chr: string;
  start: string;
  ref: string;
  alt: string;
  type: "SNP" | "InDel";
  effect: string;
  hgvs: string;
  vaf: number;
  dp: number;
  priority: "High" | "Medium" | "Low";
  confidence:
    | "High confidence"
    | "Medium confidence"
    | "Low confidence"
    | "Review needed";
  clinical: string;
};

type SortKey = "gene" | "vaf" | "dp" | "priority";
type SortDirection = "asc" | "desc";

const variants: VariantRow[] = [
  {
    gene: "TP53",
    chr: "17",
    start: "7,673,803",
    ref: "C",
    alt: "T",
    type: "SNP",
    effect: "Missense",
    hgvs: "p.R273C",
    vaf: 34.2,
    dp: 742,
    priority: "High",
    confidence: "High confidence",
    clinical: "COSMIC, ClinVar",
  },
  {
    gene: "PIK3CA",
    chr: "3",
    start: "178,936,091",
    ref: "G",
    alt: "A",
    type: "SNP",
    effect: "Missense",
    hgvs: "p.E545K",
    vaf: 18.1,
    dp: 688,
    priority: "High",
    confidence: "High confidence",
    clinical: "ClinVar",
  },
  {
    gene: "BRCA2",
    chr: "13",
    start: "32,340,312",
    ref: "A",
    alt: "AT",
    type: "InDel",
    effect: "Frameshift",
    hgvs: "p.K3326fs",
    vaf: 11.4,
    dp: 121,
    priority: "High",
    confidence: "Review needed",
    clinical: "InterVar",
  },
  {
    gene: "ATM",
    chr: "11",
    start: "108,236,164",
    ref: "C",
    alt: "A",
    type: "SNP",
    effect: "Nonsense",
    hgvs: "p.R2443*",
    vaf: 9.5,
    dp: 84,
    priority: "Medium",
    confidence: "Low confidence",
    clinical: "ClinVar",
  },
  {
    gene: "NF1",
    chr: "17",
    start: "29,556,121",
    ref: "CT",
    alt: "C",
    type: "InDel",
    effect: "Frameshift",
    hgvs: "p.L847fs",
    vaf: 7.1,
    dp: 96,
    priority: "Medium",
    confidence: "Low confidence",
    clinical: "-",
  },
  {
    gene: "KRAS",
    chr: "12",
    start: "25,398,284",
    ref: "G",
    alt: "T",
    type: "SNP",
    effect: "Missense",
    hgvs: "p.G12V",
    vaf: 22.7,
    dp: 905,
    priority: "High",
    confidence: "High confidence",
    clinical: "COSMIC",
  },
  {
    gene: "PTEN",
    chr: "10",
    start: "89,654,321",
    ref: "A",
    alt: "G",
    type: "SNP",
    effect: "Missense",
    hgvs: "p.H93R",
    vaf: 6.3,
    dp: 210,
    priority: "Low",
    confidence: "Medium confidence",
    clinical: "-",
  },
  {
    gene: "EGFR",
    chr: "7",
    start: "55,249,071",
    ref: "G",
    alt: "A",
    type: "SNP",
    effect: "Missense",
    hgvs: "p.L858R",
    vaf: 14.9,
    dp: 640,
    priority: "High",
    confidence: "High confidence",
    clinical: "COSMIC, ClinVar",
  },
];

function FilterBox({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PriorityBadge({ value }: { value: VariantRow["priority"] }) {
  const cls =
    value === "High"
      ? "border-red-200 bg-red-50 text-red-700"
      : value === "Medium"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>
      {value}
    </span>
  );
}

function ConfidenceBadge({ value }: { value: VariantRow["confidence"] }) {
  const cls =
    value === "High confidence"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : value === "Review needed"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : value === "Low confidence"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>
      {value}
    </span>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}

function VariantDrawer({
  variant,
  onClose,
}: {
  variant: VariantRow | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!variant) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [variant, onClose]);

  if (!variant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-[3px]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b bg-white px-6 py-5">
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Variant Detail
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {variant.gene} · {variant.hgvs}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <PriorityBadge value={variant.priority} />
              <ConfidenceBadge value={variant.confidence} />
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Kapat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            <div className="rounded-2xl border bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">Klinik özet</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bu panel, seçilen varyantın hızlı teknik ve klinik özetini gösterir.
                Gerçek veri bağlandığında annotation, coverage ilişkisi ve yorum alanları burada genişletilecek.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div className="rounded-2xl border bg-white p-5">
                <div className="mb-2 text-sm font-semibold text-slate-900">Temel bilgiler</div>
                <DetailRow label="Gene" value={variant.gene} />
                <DetailRow label="HGVS" value={variant.hgvs} />
                <DetailRow label="Effect" value={variant.effect} />
                <DetailRow label="Type" value={variant.type} />
                <DetailRow label="Chromosome" value={variant.chr} />
                <DetailRow label="Position" value={variant.start} />
                <DetailRow label="Ref / Alt" value={`${variant.ref} → ${variant.alt}`} />
                <DetailRow label="VAF" value={`%${variant.vaf}`} />
                <DetailRow label="Depth" value={variant.dp.toString()} />
                <DetailRow
                  label="Clinical"
                  value={variant.clinical === "-" ? "Kayıt bulunmuyor" : variant.clinical}
                />
              </div>

              <div className="rounded-2xl border bg-white p-5">
                <div className="mb-2 text-sm font-semibold text-slate-900">Review alanı</div>

                <div className="space-y-3">
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <div className="text-xs font-medium text-slate-500">Teknik değerlendirme</div>
                    <div className="mt-1 text-sm text-slate-900">
                      DP, VAF ve confidence katmanı ile birlikte yorumlanmalı.
                    </div>
                  </div>

                  <div className="rounded-xl border bg-slate-50 p-3">
                    <div className="text-xs font-medium text-slate-500">Klinik annotation</div>
                    <div className="mt-1 text-sm text-slate-900">
                      {variant.clinical === "-" ? "Kayıt bulunmuyor" : variant.clinical}
                    </div>
                  </div>

                  <div className="rounded-xl border bg-slate-50 p-3">
                    <div className="text-xs font-medium text-slate-500">Yorum notu</div>
                    <div className="mt-1 text-sm text-slate-900">
                      Coverage ve QC modülü ile birlikte çapraz değerlendirme önerilir.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5">
              <div className="mb-3 text-sm font-semibold text-slate-900">Ek teknik not</div>
              <p className="text-sm leading-6 text-slate-600">
                Bu alan daha sonra gerçek veri bağlandığında annotation detayları, coverage ilişkisi,
                popülasyon frekansı, patojenite skorları ve iç ekip yorumları ile genişletilebilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortButton({
  label,
  active,
  direction,
  onClick,
  withLeftBorder = false,
  withRightBorder = false,
}: {
  label: string;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
  withLeftBorder?: boolean;
  withRightBorder?: boolean;
}) {
  return (
    <th
      className={[
        "border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
        withLeftBorder ? "border-l" : "",
        withRightBorder ? "border-r" : "",
      ].join(" ")}
    >
      <button onClick={onClick} className="inline-flex items-center gap-1 hover:text-slate-900">
        <span>{label}</span>
        {active ? <span>{direction === "asc" ? "↑" : "↓"}</span> : null}
      </button>
    </th>
  );
}

export default function VariantsPage() {
  const [gene, setGene] = useState("");
  const [mutType, setMutType] = useState("all");
  const [priority, setPriority] = useState("all");
  const [clinical, setClinical] = useState("all");
  const [minVaf, setMinVaf] = useState("");
  const [minDp, setMinDp] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<VariantRow | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("gene");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredVariants = useMemo(() => {
    const filtered = variants.filter((variant) => {
      const geneMatch =
        gene.trim() === "" ||
        variant.gene.toLowerCase().includes(gene.trim().toLowerCase());

      const typeMatch = mutType === "all" || variant.type === mutType;
      const priorityMatch = priority === "all" || variant.priority === priority;

      const clinicalMatch =
        clinical === "all" ||
        (clinical === "yes" ? variant.clinical !== "-" : variant.clinical === "-");

      const minVafMatch = minVaf.trim() === "" || variant.vaf >= Number(minVaf);
      const minDpMatch = minDp.trim() === "" || variant.dp >= Number(minDp);

      return (
        geneMatch &&
        typeMatch &&
        priorityMatch &&
        clinicalMatch &&
        minVafMatch &&
        minDpMatch
      );
    });

    const priorityRank: Record<VariantRow["priority"], number> = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return [...filtered].sort((a, b) => {
      let result = 0;

      switch (sortKey) {
        case "gene":
          result = a.gene.localeCompare(b.gene);
          break;
        case "vaf":
          result = a.vaf - b.vaf;
          break;
        case "dp":
          result = a.dp - b.dp;
          break;
        case "priority":
          result = priorityRank[a.priority] - priorityRank[b.priority];
          break;
      }

      return sortDirection === "asc" ? result : -result;
    });
  }, [gene, mutType, priority, clinical, minVaf, minDp, sortKey, sortDirection]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Variant Explorer
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                Filtreleme, önceliklendirme ve klinik yorumlanabilirlik bu tablo üzerinden yürütülür.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                significant.snp_indel.xls
              </span>
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {filteredVariants.length} varyant
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold tracking-tight text-slate-900">
                  Filtreler
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Çalışma tablosunu hızlı daraltmak için filtre alanı
                </p>
              </div>

              <button
                onClick={() => {
                  setGene("");
                  setMutType("all");
                  setPriority("all");
                  setClinical("all");
                  setMinVaf("");
                  setMinDp("");
                  setSortKey("gene");
                  setSortDirection("asc");
                }}
                className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Filtreleri temizle
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              <FilterBox
                label="Gen"
                placeholder="Örn: TP53"
                value={gene}
                onChange={setGene}
              />
              <SelectBox
                label="Mutasyon tipi"
                value={mutType}
                onChange={setMutType}
                options={[
                  { label: "Tümü", value: "all" },
                  { label: "SNP", value: "SNP" },
                  { label: "InDel", value: "InDel" },
                ]}
              />
              <SelectBox
                label="Öncelik"
                value={priority}
                onChange={setPriority}
                options={[
                  { label: "Tümü", value: "all" },
                  { label: "High", value: "High" },
                  { label: "Medium", value: "Medium" },
                  { label: "Low", value: "Low" },
                ]}
              />
              <FilterBox
                label="Minimum VAF"
                placeholder="Örn: 5"
                value={minVaf}
                onChange={setMinVaf}
                type="number"
              />
              <FilterBox
                label="Minimum DP"
                placeholder="Örn: 100"
                value={minDp}
                onChange={setMinDp}
                type="number"
              />
              <SelectBox
                label="Klinik annotation"
                value={clinical}
                onChange={setClinical}
                options={[
                  { label: "Tümü", value: "all" },
                  { label: "Var", value: "yes" },
                  { label: "Yok", value: "no" },
                ]}
              />
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <SortButton
                    label="Gene"
                    active={sortKey === "gene"}
                    direction={sortDirection}
                    onClick={() => toggleSort("gene")}
                    withLeftBorder
                  />
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Chr
                  </th>
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Start
                  </th>
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Ref
                  </th>
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Alt
                  </th>
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Effect
                  </th>
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    HGVS
                  </th>
                  <SortButton
                    label="VAF"
                    active={sortKey === "vaf"}
                    direction={sortDirection}
                    onClick={() => toggleSort("vaf")}
                  />
                  <SortButton
                    label="DP"
                    active={sortKey === "dp"}
                    direction={sortDirection}
                    onClick={() => toggleSort("dp")}
                  />
                  <SortButton
                    label="Priority"
                    active={sortKey === "priority"}
                    direction={sortDirection}
                    onClick={() => toggleSort("priority")}
                  />
                  <th className="border-y bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Confidence
                  </th>
                  <th className="border-y border-r bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Clinical
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredVariants.length > 0 ? (
                  filteredVariants.map((variant, index) => (
                    <tr
                      key={`${variant.gene}-${variant.start}-${variant.hgvs}`}
                      onClick={() => setSelectedVariant(variant)}
                      className={`cursor-pointer ${
                        selectedVariant?.gene === variant.gene &&
                        selectedVariant?.start === variant.start &&
                        selectedVariant?.hgvs === variant.hgvs
                          ? "bg-blue-50/70"
                          : index % 2 === 0
                          ? "bg-white hover:bg-slate-50"
                          : "bg-slate-50/60 hover:bg-slate-100/70"
                      }`}
                    >
                      <td className="border-b border-l px-4 py-4 text-sm font-semibold text-slate-900">
                        {variant.gene}
                      </td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.chr}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.start}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.ref}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.alt}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.type}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.effect}</td>
                      <td className="border-b px-4 py-4 text-sm font-medium text-slate-900">{variant.hgvs}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">%{variant.vaf}</td>
                      <td className="border-b px-4 py-4 text-sm text-slate-600">{variant.dp}</td>
                      <td className="border-b px-4 py-4 text-sm">
                        <PriorityBadge value={variant.priority} />
                      </td>
                      <td className="border-b px-4 py-4 text-sm">
                        <ConfidenceBadge value={variant.confidence} />
                      </td>
                      <td className="border-b border-r px-4 py-4 text-sm text-slate-600">
                        {variant.clinical}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={13}
                      className="border-b border-l border-r bg-white px-4 py-10 text-center text-sm text-slate-500"
                    >
                      Filtrelere uygun varyant bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <VariantDrawer
        variant={selectedVariant}
        onClose={() => setSelectedVariant(null)}
      />
    </DashboardShell>
  );
}