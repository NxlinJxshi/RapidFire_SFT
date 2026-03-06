export default function Reproducibility() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Reproducibility Guide</h1>

      <p className="mt-3 text-neutral-700 leading-7">
        This page documents the execution scaffolding used to rerun and inspect the RapidFire supervised fine-tuning experiments. The same infrastructure supported the Baseline, LoRA rank study, and base-model comparison workflow.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Core Setup</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Reproducibility depended on a consistent environment using RapidFire, HuggingFace Transformers, PEFT, and TensorBoard-compatible logging.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View core imports
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`from rapidfire import *
from rapidfire.experiments import RFGridSearch
from rapidfire.models import RFModelConfig
from rapidfire.training_args import RFSFTConfig
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from peft import get_peft_model, TaskType
import evaluate
import numpy as np
import torch
import os`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Model Construction</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The experiments relied on reusable model-construction functions so that each RapidFire run could instantiate the correct seq2seq model, tokenizer, and LoRA-wrapped architecture under a consistent interface. Model construction functions differ between T5 and BART due to architecture-specific requirements, particularly in LoRA target module naming: T5 uses target_modules=["q", "v"] while BART uses ["q_proj", "v_proj"].
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View sample_create_model (T5)
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`def sample_create_model(model_config):
    model = AutoModelForSeq2SeqLM.from_pretrained(
        model_config.model_name,
        **(model_config.model_kwargs or {})
    )
    tokenizer = AutoTokenizer.from_pretrained(model_config.model_name, use_fast=True)

    if hasattr(model_config, "peft_config") and model_config.peft_config is not None:
        model = get_peft_model(model, model_config.peft_config)

    return model, tokenizer`}</code>
        </pre>
      </details>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View sample_create_model_BART
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`def sample_create_model_BART(model_config):
    model = AutoModelForSeq2SeqLM.from_pretrained(
        model_config.model_name,
        **(model_config.model_kwargs or {})
    )
    tokenizer = AutoTokenizer.from_pretrained(model_config.model_name, use_fast=True)

    if hasattr(model_config, "peft_config") and model_config.peft_config is not None:
        model = get_peft_model(model, model_config.peft_config)

    return model, tokenizer`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Evaluation Metric Function</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Reproducibility also required a consistent metric computation pipeline so that runs could be compared under the same evaluation rule. ROUGE-based summary evaluation was used through a reusable helper. Metric computation functions are model-specific due to tokenizer differences between T5 and BART architectures.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View sample_compute_metrics_T5
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`rouge = evaluate.load("rouge")

def sample_compute_metrics_T5(eval_preds):
    predictions, labels = eval_preds

    predictions = np.where(predictions != -100, predictions, 0)
    labels = np.where(labels != -100, labels, 0)

    decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    results = rouge.compute(
        predictions=decoded_preds,
        references=decoded_labels,
        use_stemmer=True,
    )

    return {
        "rouge1": results["rouge1"],
        "rouge2": results["rouge2"],
        "rougeL": results["rougeL"],
        "rougeLsum": results["rougeLsum"],
    }`}</code>
        </pre>
      </details>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View sample_compute_metrics_BART
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`rouge = evaluate.load("rouge")

def sample_compute_metrics_BART(eval_preds):
    predictions, labels = eval_preds

    predictions = np.where(predictions != -100, predictions, 0)
    labels = np.where(labels != -100, labels, 0)

    decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)
    decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

    results = rouge.compute(
        predictions=decoded_preds,
        references=decoded_labels,
        use_stemmer=True,
    )

    return {
        "rouge1": results["rouge1"],
        "rouge2": results["rouge2"],
        "rougeL": results["rougeL"],
        "rougeLsum": results["rougeLsum"],
    }`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">TensorBoard Monitoring</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        TensorBoard was used to inspect learning curves, compare runs, and verify whether metrics were being written correctly during training.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View TensorBoard launch commands
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`%reload_ext tensorboard
%tensorboard --logdir /content/rapidfireai/logs`}</code>
        </pre>
      </details>

      <p className="mt-3 text-neutral-700 leading-7">
        This same logging workflow was used to inspect Baseline, LoRA-rank, and T5-vs-BART experiments side by side when valid runs completed successfully. T5 and BART runs can be compared side-by-side in TensorBoard to evaluate architecture-level differences.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Viewing Logs and Saved Artifacts</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        RapidFire organizes experiment outputs into a reproducible directory structure, making it easier to inspect both controller-level and training-level behavior after a run.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View log inspection commands
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`!ls /content/rapidfireai/logs
!ls /content/rapidfireai/rapidfire_experiments
!cat /content/rapidfireai/logs/academic_summarization_baseline/rapidfire.log
!cat /content/rapidfireai/logs/academic_summarization_baseline/training.log`}</code>
        </pre>
      </details>

      <p className="mt-3 text-neutral-700 leading-7">
        The rapidfire.log records controller and orchestration level events, while training.log records trainer-level behavior. TensorBoard event files store scalar metric histories, and experiment folders preserve configurations and outputs for later comparison.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Saved Output Structure</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Outputs were stored in organized folders so the experiment workflow could be rerun and audited later.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View saved directory structure
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`/content/rapidfireai/
├── logs/
│   ├── academic_summarization_baseline/
│   │   ├── rapidfire.log
│   │   └── training.log
│   └── ...
├── rapidfire_experiments/
│   ├── academic_summarization_baseline/
│   │   ├── datasets.dill
│   │   └── ...
│   └── ...
└── ...`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Execution and Inspection Workflow</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The practical reproducibility loop involves configuring the experiment, executing with RapidFire, monitoring TensorBoard, inspecting logs, and comparing saved artifacts across runs. This workflow applies consistently whether running Baseline, LoRA-rank variations, or T5-vs-BART comparisons.
      </p>

      <p className="mt-3 text-neutral-700 leading-7">
        Reproducibility in this project was not only about rerunning code, but about preserving a consistent experiment interface across baseline, LoRA-rank, and base-model-comparison studies so that differences in behavior could be diagnosed and compared systematically. The structured experiment design accommodates model-specific differences in construction and metrics computation while maintaining a unified execution framework.
      </p>
    </main>
  );
}
