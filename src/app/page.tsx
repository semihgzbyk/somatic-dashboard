import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-3xl rounded-3xl border bg-white p-10 shadow-sm">
        <span className="inline-flex rounded-full border bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          Somatic Dashboard
        </span>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          Somatik analiz arayüzü
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Modüller ayrı sayfalarda çalışacak şekilde yapılandırılıyor. Overview,
          Variant Explorer, Coverage, QC ve Reports ekranlarına yandaki akışa
          uygun route yapısıyla geçeceğiz.
        </p>

        <div className="mt-6">
          <Link
            href="/overview"
            className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Overview ekranına git
          </Link>
        </div>
      </div>
    </main>
  );
}