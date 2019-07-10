<script>
  import { beforeUpdate, tick } from 'svelte'

  let preview
  let value = ''

  beforeUpdate(() => {
    if (preview) {
      updatePreview()
    }
  })

  function updatePreview() {
    preview.textContent = value

    updateMathJax(preview)
  }

  async function updateMathJax(element) {
    let MathJax = getMathJax()

    if (!MathJax || !MathJax.Hub) {
      return
    }

    await tick()

    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
  }

  function getMathJax() {
    return window.MathJax
  }
</script>

<style>
  .app__container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .app__text-editor {
    width: 50%;
    height: 100%;
    box-shadow: none;
    border: none;
    outline: none;
    resize: none;
    border-radius: 0;
    border-right: 1px solid hsl(0, 0%, 80%);
  }

  .app__preview {
    width: 50%;
    height: 100%;
  }
</style>

<div class="app__container">
  <textarea class="app__text-editor" bind:value />

  <div class="app__preview" bind:this={preview} />
</div>
