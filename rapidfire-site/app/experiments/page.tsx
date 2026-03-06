export default function Experiments() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14">
      <h1 className="text-3xl font-bold">Experiment Design</h1>

      <p className="mt-3 text-neutral-700 leading-7">
        This project evaluates supervised fine-tuning for instruction-based academic summarization using RapidFire AI, with emphasis on reproducible experimentation rather than only final model quality.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Dataset Preparation</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The experiments used a public arXiv-style academic summarization dataset configured for supervised input-target setup. To ensure stable execution on free Colab GPU resources, reduced train and validation splits were used. Preprocessing remained consistent across all experiments to maintain controlled comparisons.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View dataset loading and split code
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`from datasets import load_dataset

dataset = load_dataset("ccdv/arxiv-summarization")

train_dataset = dataset["train"].select(range(64)).shuffle(seed=42)
eval_dataset  = dataset["validation"].select(range(16)).shuffle(seed=42)

print("Train size:", len(train_dataset))
print("Eval size:", len(eval_dataset))`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Input Formatting and Tokenization</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The task instruction was fixed across all experiments to maintain consistency. Examples were formatted as instruction plus paper text mapping to abstract target. Fixed source and target sequence lengths were used to ensure stable T4-compatible sequence-to-sequence training. This approach kept preprocessing controlled across Baseline and LoRA-rank experiments.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View formatting function
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`BASE_SUMMARIZATION_INSTRUCTION = (
    "Summarize the following academic paper into a concise abstract. "
    "Preserve key technical terms, emphasize the main contributions and results, "
    "and use formal academic tone."
)

def format_example(ex):
    return {
        "input_text": f"{BASE_SUMMARIZATION_INSTRUCTION}\\n\\nPaper:\\n{ex['article']}",
        "target_text": ex["abstract"],
    }

train_dataset = train_dataset.map(format_example, remove_columns=train_dataset.column_names)
eval_dataset  = eval_dataset.map(format_example, remove_columns=eval_dataset.column_names)`}</code>
        </pre>
      </details>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View tokenization setup
        </summary>
        <div className="mt-3 space-y-4">
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">T5 tokenization</p>
            <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
              <code>{`from transformers import AutoTokenizer

model_name = "google/flan-t5-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)

max_source_len = 512
max_target_len = 128

def tokenize_seq2seq_fixed(batch):
    enc = tokenizer(
        batch["input_text"],
        max_length=max_source_len,
        truncation=True,
        padding="max_length",
    )

    dec = tokenizer(
        batch["target_text"],
        max_length=max_target_len,
        truncation=True,
        padding="max_length",
    )

    labels = dec["input_ids"]
    pad_id = tokenizer.pad_token_id
    labels = [[(-100 if tok == pad_id else tok) for tok in seq] for seq in labels]
    enc["labels"] = labels
    return enc`}</code>
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-700 mb-2">BART tokenization</p>
            <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
              <code>{`from transformers import AutoTokenizer

model_name = "facebook/bart-base"
tokenizer = AutoTokenizer.from_pretrained(model_name)

max_source_len = 512
max_target_len = 128

def tokenize_seq2seq_fixed_BART(batch):
    enc = tokenizer(
        batch["input_text"],
        max_length=max_source_len,
        truncation=True,
        padding="max_length",
    )

    dec = tokenizer(
        batch["target_text"],
        max_length=max_target_len,
        truncation=True,
        padding="max_length",
    )

    labels = dec["input_ids"]
    pad_id = tokenizer.pad_token_id
    labels = [[(-100 if tok == pad_id else tok) for tok in seq] for seq in labels]
    enc["labels"] = labels
    return enc`}</code>
            </pre>
          </div>
        </div>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Experimental Scope</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Three successful experiment implementations were completed: Baseline, LoRA Rank Variation, and T5 vs BART base-model comparison. Additional implementation attempts were explored during development, but only stable and reproducible runs were retained for the final comparison.
      </p>

      <h3 className="mt-6 text-lg font-semibold">Successful Experiment Setups</h3>

      <table className="w-full border-collapse mt-4 text-sm">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left font-semibold">Experiment</th>
            <th className="border-b px-4 py-2 text-left font-semibold">Primary Variable</th>
            <th className="border-b px-4 py-2 text-left font-semibold">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b px-4 py-2">Baseline</td>
            <td className="border-b px-4 py-2">Reference setup</td>
            <td className="border-b px-4 py-2">Establish stable control pipeline</td>
          </tr>
          <tr>
            <td className="border-b px-4 py-2">LoRA Rank Variation</td>
            <td className="border-b px-4 py-2">LoRA rank</td>
            <td className="border-b px-4 py-2">Measure impact of adapter capacity under controlled conditions</td>
          </tr>
          <tr>
            <td className="border-b px-4 py-2">T5 vs BART</td>
            <td className="border-b px-4 py-2">Base model</td>
            <td className="border-b px-4 py-2">Compare backbone-level behavior under the same summarization pipeline</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-10 text-xl font-semibold">Baseline Run</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The baseline established the reference training pipeline and served as the control configuration for later comparisons. It fixed the core model and training workflow, dataset pipeline, and logging behavior.
      </p>

      <h2 className="mt-10 text-xl font-semibold">LoRA Rank Study</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The second successful experiment varied the LoRA rank while keeping the rest of the training pipeline as controlled as possible. This isolates the effect of adapter capacity on convergence and evaluation behavior.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Base-Model Comparison</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The study also included a base-model comparison axis using FLAN-T5 and BART, so that architecture-level variation could be explored in addition to LoRA-rank variation. This comparison maintained the same summarization pipeline and training configuration across both model architectures to isolate the effect of backbone choice.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Grid Search and Configuration Strategy</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        RapidFire was used in a grid-search style workflow where multiple configurations were defined under a common pipeline. As many variables as possible were held fixed while one change was isolated, making the experimentation systematic rather than ad hoc.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View LoRA rank grid-search configuration
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`from peft import TaskType

peft_configs = List([
    RFLoraConfig(
        r=8,
        lora_alpha=32,
        target_modules=["q", "v"],
        lora_dropout=0.05,
        bias="none",
        task_type=TaskType.SEQ_2_SEQ_LM
    ),
    RFLoraConfig(
        r=16,
        lora_alpha=32,
        target_modules=["q", "v"],
        lora_dropout=0.05,
        bias="none",
        task_type=TaskType.SEQ_2_SEQ_LM
    ),
])

config_set = List([
    RFModelConfig(
        model_name=T5_MODEL_NAME,
        model_type="seq2seq_lm",
        model_kwargs={
            "device_map": "auto",
            "torch_dtype": "float16",
            "use_cache": False,
        },
        peft_config=peft_configs,
        compute_metrics=sample_compute_metrics_T5,
        training_args=RFSFTConfig(
            max_steps=30,
            logging_steps=1,
            eval_strategy="steps",
            eval_steps=5,
            learning_rate=2e-4,
            lr_scheduler_type="linear",
            per_device_train_batch_size=1,
            per_device_eval_batch_size=1,
            gradient_accumulation_steps=1,
            fp16=True,
            gradient_checkpointing=True,
            report_to="tensorboard",
        ),
    )
])

config_group = RFGridSearch(configs=config_set, trainer_type="SFT")`}</code>
        </pre>
      </details>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View base-model comparison configuration
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`config_group = RFGridSearch(
    configs=List([
        RFModelConfig(
            model_name="google/flan-t5-small",
            model_type="seq2seq_lm",
            peft_config=RFLoraConfig(
                r=16,
                lora_alpha=32,
                target_modules=["q", "v"],
                lora_dropout=0.05,
                bias="none",
                task_type=TaskType.SEQ_2_SEQ_LM,
            ),
            training_args=RFSFTConfig(
                max_steps=30,
                logging_steps=1,
                eval_strategy="steps",
                eval_steps=5,
                learning_rate=5e-5,
                per_device_train_batch_size=1,
                per_device_eval_batch_size=1,
                gradient_accumulation_steps=1,
                fp16=False,
                gradient_checkpointing=True,
                report_to="tensorboard",
            ),
        ),
        RFModelConfig(
            model_name="facebook/bart-base",
            model_type="seq2seq_lm",
            peft_config=RFLoraConfig(
                r=16,
                lora_alpha=32,
                target_modules=["q_proj", "v_proj"],
                lora_dropout=0.05,
                bias="none",
                task_type=TaskType.SEQ_2_SEQ_LM,
            ),
            training_args=RFSFTConfig(
                max_steps=30,
                logging_steps=1,
                eval_strategy="steps",
                eval_steps=5,
                learning_rate=5e-5,
                per_device_train_batch_size=1,
                per_device_eval_batch_size=1,
                gradient_accumulation_steps=1,
                fp16=False,
                gradient_checkpointing=True,
                report_to="tensorboard",
            ),
        ),
    ]),
    trainer_type="SFT",
)`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">RapidFire Execution</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        RapidFire's experiment controller was used through experiment.run_fit(...). Each configuration becomes its own run, runs are logged consistently, and outputs are organized for side-by-side comparison. This supports repeatability and comparison under a shared experiment structure.
      </p>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View run_fit execution call
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`experiment.run_fit(
    config_group,
    sample_create_model,
    tokenized_train_T5,
    tokenized_eval_T5,
    num_chunks=1,
    seed=42,
)`}</code>
        </pre>
      </details>

      <details className="mt-4 rounded-xl border bg-neutral-50 p-4">
        <summary className="cursor-pointer font-medium text-neutral-800">
          View BART execution call
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{`experiment.run_fit(
    config_group,
    sample_create_model_BART,
    tokenized_train_BART,
    tokenized_eval_BART,
    num_chunks=1,
    seed=42,
)`}</code>
        </pre>
      </details>

      <h2 className="mt-10 text-xl font-semibold">Implementation Notes</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        Earlier development included debugging around configurations that appeared to expose trainable parameters but produced runs with zero trainable tensor updates. Final reported experiments only include runs that executed correctly and produced valid logged outputs.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Reproducibility Controls</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The experimental design incorporated several reproducibility controls: fixed preprocessing pipeline, consistent dataset split, controlled training setup across comparisons, consistent logging and artifact collection, and the same evaluation procedure across successful runs.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Final Experimental Framing</h2>

      <p className="mt-3 text-neutral-700 leading-7">
        The final three-experiment design demonstrates RapidFire AI's value in organizing, comparing, and reproducing SFT experiments in a compact but rigorous study.
      </p>
    </main>
  );
}
