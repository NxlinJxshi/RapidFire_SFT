export default function Results() {
  return (
    <main className="mx-auto max-w-6xl px-6 lg:px-10 py-14">
      <h1 className="text-3xl font-bold">Experiment Results</h1>

      <p className="mt-4 text-neutral-700">
        This page presents training metrics and evaluation results from the RapidFire
        SFT experiments.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Best Run Summary</h2>
      <table className="mt-3 w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left font-semibold">Model</th>
            <th className="border-b px-4 py-2 text-left font-semibold">LoRA Rank</th>
            <th className="border-b px-4 py-2 text-left font-semibold">ROUGE-L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b px-4 py-2">FLAN-T5</td>
            <td className="border-b px-4 py-2">16</td>
            <td className="border-b px-4 py-2">0.3425</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-neutral-700">
        Across the tested configurations, increasing the LoRA rank improved evaluation performance while maintaining stable training behavior. The r=16 configuration produced the highest ROUGE-L score among completed runs.
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

      {/* ===== Experiment B ===== */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Experiment B: Base Model Comparison (T5 vs BART)</h2>

        <p className="mt-3 text-neutral-700">
          This experiment compares FLAN-T5 and BART under the same LoRA configuration in order to study the effect of the underlying seq2seq architecture on summarization training behavior.
        </p>

        {/* Config (side-by-side) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure>
            <img
              src="/results/ExperimentB_metrics/EXPB_T5_Config.png"
              alt="T5 configuration"
              className="w-full max-h-[320px] object-contain rounded-xl border"
            />
            <figcaption className="mt-2 text-sm text-neutral-600">
              T5 configuration
            </figcaption>
          </figure>
          <figure>
            <img
              src="/results/ExperimentB_metrics/EXPB_BART_Config.png"
              alt="BART configuration"
              className="w-full max-h-[320px] object-contain rounded-xl border"
            />
            <figcaption className="mt-2 text-sm text-neutral-600">
              BART configuration
            </figcaption>
          </figure>
        </div>

        {/* Status box */}
        <div className="mt-6 rounded-xl border bg-neutral-50 p-4">
          <h3 className="text-sm font-semibold text-neutral-800 mb-2">Status</h3>
          <p className="text-sm text-neutral-700 leading-6">
            This experiment configuration has been implemented and validated at the configuration level, but execution is currently under debugging due to an issue where the training run reports zero trainable tensor updates despite LoRA parameters being correctly exposed.
          </p>
          <p className="text-sm text-neutral-700 leading-6 mt-2">
            The configuration and execution scaffolding for this experiment are included in the Experiments and Reproducibility sections. Once the debugging process is complete, this section will be updated with training curves and evaluation metrics.
          </p>
        </div>
      </section>
    </main>
  );
}