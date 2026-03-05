export default function Experiments() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-bold">Experiment Design</h1>

      <p className="mt-4 text-neutral-700">
        This project evaluates supervised fine-tuning configurations for
        academic summarization using RapidFire AI's experimentation API.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Experiment Dimensions</h2>

      <ul className="mt-3 list-disc pl-6 space-y-2 text-neutral-800">
        <li>Base model architecture (T5 vs BART)</li>
        <li>LoRA configuration (rank, dropout, target modules)</li>
        <li>Training hyperparameters (learning rate, batch size)</li>
        <li>Prompt / formatting scheme</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Execution</h2>

      <p className="mt-3 text-neutral-700">
        Experiments were executed using RapidFire's hyperparallel experiment
        controller through the <code>run_fit()</code> API.
      </p>
    </main>
  );
}
