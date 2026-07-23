import * as pdfjsLib from "./pdfjs/pdf.min.mjs"

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("./pdfjs/pdf.worker.min.mjs", import.meta.url)

async function renderPdf(container) {
  const url = container.dataset.src
  if (!url || container.dataset.rendered) return
  container.dataset.rendered = "true"

  const pdf = await pdfjsLib.getDocument(url).promise
  const scale = window.devicePixelRatio > 1 ? 1.5 * window.devicePixelRatio : 1.5

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement("canvas")
    canvas.width = viewport.width
    canvas.height = viewport.height

    container.appendChild(canvas)
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise
  }
}

function initAll() {
  document.querySelectorAll(".pdf-embed:not([data-rendered])").forEach(renderPdf)
}

// Quartz SPA navigation events
document.addEventListener("nav", initAll)
document.addEventListener("render", initAll)
initAll()