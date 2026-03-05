export default function Reproducibility() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="text-3xl font-bold">Reproducibility</h1>

      <p className="mt-4 text-neutral-700">
        All experiments were executed using RapidFire AI's
        experiment management API with deterministic seeds
        and logged artifacts.
      </p>

      <h2 className="mt-8 text-xl font-semibold">Reproduction Steps</h2>

      <ol className="mt-3 list-decimal pl-6 space-y-2 text-neutral-800">
        <li>Open the provided Colab notebook</li>
        <li>Install RapidFire dependencies</li>
        <li>Configure experiment parameters</li>
        <li>Run run_fit() to execute experiments</li>
        <li>Inspect TensorBoard logs</li>
      </ol>
    </main>
  )
}
