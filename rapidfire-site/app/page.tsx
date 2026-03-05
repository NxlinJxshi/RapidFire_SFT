export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold leading-tight">
          RapidFire SFT Experiments: Instruction-Based Academic Summarization
        </h1>
        <p className="text-lg text-neutral-600">
          Reproducible supervised fine-tuning experiments comparing base models,
          LoRA configurations, and prompt formatting—reported with loss and ROUGE.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Abstract</h2>
        <p className="mt-3 leading-7 text-neutral-800">
          This project evaluates supervised fine-tuning configurations for academic
          paper summarization on public data. Using RapidFire AI’s experimentation
          API, we run controlled hyperparallel experiments across multiple model and
          PEFT settings, log learning curves to TensorBoard, and compare outcomes using
          evaluation loss and ROUGE-style metrics. The goal is a customer-ready,
          end-to-end notebook that demonstrates reproducible experimentation rather
          than one-off model tuning.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Artifacts</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-800">
          <li>Colab notebook (end-to-end SFT + RapidFire runs)</li>
          <li>TensorBoard logs and exported metric curves</li>
          <li>2–3 screenshots overlaying all configurations</li>
          <li>GitHub repo with code + rapidfire.log/training.log for each run</li>
          <li>Short experiment summary document (competition template)</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Navigation</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <a className="rounded-xl border p-4 hover:bg-neutral-50" href="#">
            <div className="font-medium">Experiments</div>
            <div className="text-sm text-neutral-600">
              Config grid, key knobs, and best run
            </div>
          </a>
          <a className="rounded-xl border p-4 hover:bg-neutral-50" href="#">
            <div className="font-medium">Results</div>
            <div className="text-sm text-neutral-600">
              Loss / eval loss / ROUGE curves and takeaways
            </div>
          </a>
          <a className="rounded-xl border p-4 hover:bg-neutral-50" href="#">
            <div className="font-medium">Reproducibility</div>
            <div className="text-sm text-neutral-600">
              Seeds, logs, environment, and rerun steps
            </div>
          </a>
          <a className="rounded-xl border p-4 hover:bg-neutral-50" href="#">
            <div className="font-medium">Repo</div>
            <div className="text-sm text-neutral-600">
              Code + artifacts (notebook, logs, screenshots)
            </div>
          </a>
        </div>
      </section>

      <footer className="mt-14 border-t pt-6 text-sm text-neutral-600">
        Built with Next.js • Deployed on Vercel
      </footer>
    </main>
  );
}