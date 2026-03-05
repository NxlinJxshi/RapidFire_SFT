export default function Results() {
  return (
    <main className="mx-auto max-w-6xl px-6 lg:px-10 py-14">
      <h1 className="text-3xl font-bold">Experiment Results</h1>

      <p className="mt-4 text-neutral-700">
        This page presents training metrics and evaluation results from the RapidFire
        SFT experiments.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Metrics</h2>
      <ul className="mt-3 list-disc pl-6 space-y-2 text-neutral-800">
        <li>Training loss</li>
        <li>Evaluation loss</li>
        <li>ROUGE-1</li>
        <li>ROUGE-L</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Learning Curves</h2>
      <p className="mt-3 text-neutral-700">
        TensorBoard visualizations compare different configurations including base
        model architecture and LoRA rank.
      </p>

      {/* ===== Baseline ===== */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Baseline</h2>

        {/* Config (full width) */}
        <figure className="mt-5">
          <div className="overflow-hidden rounded-xl border bg-white">
            <img
              src="/results/Baseline_metrics/Baseline_config.png"
              alt="Baseline configuration"
              className="w-full h-auto block"
            />
          </div>
          <figcaption className="mt-2 text-sm text-neutral-600">
            Baseline configuration.
          </figcaption>
        </figure>

        {/* Curves row: 3 across on Mac */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <figure>
            <div className="rounded-xl border bg-white p-2 w-[300px]">
              <img
                src="/results/Baseline_metrics/Baseline_trainloss.png"
                alt="Baseline training loss"
                className="w-full h-64 object-contain block"
              />
            </div>
            <figcaption className="mt-2 text-sm text-neutral-600">
              Train loss vs. step.
            </figcaption>
          </figure>

          <figure>
            <div className="rounded-xl border bg-white p-2">
              <img
                src="/results/Baseline_metrics/Baseline_EvalLoss.png"
                alt="Baseline eval loss"
                className="w-full h-64 object-contain block"
              />
            </div>
            <figcaption className="mt-2 text-sm text-neutral-600">
              Eval loss vs. step.
            </figcaption>
          </figure>

          <figure>
            <div className="rounded-xl border bg-white p-2">
              <img
                src="/results/Baseline_metrics/Baseline_EvalMeanToken.png"
                alt="Baseline eval mean token"
                className="w-full h-64 object-contain block"
              />
            </div>
            <figcaption className="mt-2 text-sm text-neutral-600">
              Eval mean token metric.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ===== Experiment A ===== */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Experiment A: LoRA</h2>

        {/* Config (full width) */}
        <figure className="mt-5">
          <div className="overflow-hidden rounded-xl border bg-white">
            <img
              src="/results/ExperimentA_metrics/EXPA_Config.png"
              alt="Experiment A configuration"
              className="w-full h-auto block"
            />
          </div>
          <figcaption className="mt-2 text-sm text-neutral-600">
            Experiment A configuration (LoRA-focused changes).
          </figcaption>
        </figure>

        {/* Curves row: 3 across on Mac */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <figure>
            <div className="rounded-xl border bg-white p-2">
              <img
                src="/results/ExperimentA_metrics/EXPA_EvalLoss.png"
                alt="Experiment A eval loss"
                className="w-full h-64 object-contain block"
              />
            </div>
            <figcaption className="mt-2 text-sm text-neutral-600">
              Eval loss vs. step.
            </figcaption>
          </figure>

          <figure>
            <div className="rounded-xl border bg-white p-2">
              <img
                src="/results/ExperimentA_metrics/EXPA_EvalRouge2.png"
                alt="Experiment A ROUGE-2"
                className="w-full h-64 object-contain block"
              />
            </div>
            <figcaption className="mt-2 text-sm text-neutral-600">
              ROUGE-2 vs. step.
            </figcaption>
          </figure>

          <figure>
            <div className="rounded-xl border bg-white p-2">
              <img
                src="/results/ExperimentA_metrics/EXPA_EvalRougeL.png"
                alt="Experiment A ROUGE-L"
                className="w-full h-64 object-contain block"
              />
            </div>
            <figcaption className="mt-2 text-sm text-neutral-600">
              ROUGE-L vs. step.
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}