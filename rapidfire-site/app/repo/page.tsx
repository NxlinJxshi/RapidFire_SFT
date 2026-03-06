import Link from "next/link";

export default function Repo() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Repository Guide</h1>

      <p className="mt-3 text-neutral-700 leading-7">
        This section helps readers navigate the project repository, locate the main notebook and artifacts, and understand how the website, experiment code, and saved outputs fit together.
      </p>

      <div className="mt-6">
        <Link
          href="#"
          className="inline-flex rounded-full border px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors"
        >
          View GitHub Repository
        </Link>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Repository Overview</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The repository contains the main fine-tuning notebook, experiment logs and metric screenshots, the Next.js project website, and supporting project files for reproducibility and presentation.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Directory Structure</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The project is organized into notebook, website, and artifact-oriented components.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View repository structure
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`rapidfire-sft-project/
├── app/
│   ├── experiments/
│   │   └── page.tsx
│   ├── repo/
│   │   └── page.tsx
│   ├── reproducibility/
│   │   └── page.tsx
│   ├── results/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── results/
│       ├── Baseline_metrics/
│       └── ExperimentA_metrics/
├── SFT_submission_Nalin.ipynb
├── package.json
└── README.md`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Main Notebook</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The primary execution artifact is the main notebook and it contains the end-to-end workflow for the supervised fine-tuning study.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View what the notebook contains
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`SFT_submission_Nalin.ipynb
- environment setup
- dataset loading
- formatting and tokenization
- RapidFire configuration
- baseline run
- LoRA-rank experiment
- base-model comparison setup
- evaluation and TensorBoard logging`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Website Structure</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The Next.js site was built to present the project as a research-style artifact, with distinct pages for methodology, results, reproducibility, and repository navigation.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View website page responsibilities
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`Home             -> project overview and abstract
Experiments      -> methodology and experiment design
Results          -> metric screenshots and visual comparisons
Reproducibility  -> execution scaffolding, logs, and monitoring
Repo             -> repository map and project navigation`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Artifacts and Outputs</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Experiment outputs include TensorBoard screenshots, RapidFire log files, training logs, and saved experiment folders.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View artifact categories
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`Artifacts
- TensorBoard metric screenshots
- rapidfire.log files
- training.log files
- experiment output folders
- website assets for presentation`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">How to Use the Repository</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Readers should start with the notebook for the core experiment workflow, use the website pages for structured interpretation, inspect results and logs through the saved outputs, and use the repository structure to trace where each artifact lives.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View recommended reading / usage order
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`1. Open SFT_submission_Nalin.ipynb
2. Review the Experiments page for methodology
3. Review the Results page for metric curves
4. Use the Reproducibility page to inspect execution/logging details
5. Use the Repo page as a map of files and outputs`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Repository Design Rationale</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The repository is organized not just as code storage, but as a customer-ready and judge-friendly project artifact. The structure emphasizes clarity, reproducibility, and separation between methodology, results, and execution details. This design makes it easier for readers to understand the project's scope, reproduce the experiments, and navigate between different aspects of the work without confusion.
      </p>

      <p className="mt-3 text-neutral-700 leading-7">
        The repository structure supports both direct execution through the notebook and high-level understanding through the website, making the project easier to inspect, reproduce, and reuse.
      </p>
    </main>
  );
}
