import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Button, Input, Loader, Model, Toast } from '../components/ui'

function Demo() {
  const [productName, setProductName] = useState('Premium water bottle')
  const [keypoints, setKeypoints] = useState('Insulated steel, leak proof lid, 24 hour chill')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!isGenerating) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      const generatedDraft = `A refined ${productName.toLowerCase()} designed for daily performance. ${keypoints}. Built for customers who want practical utility with a polished finish.`

      setDraft(generatedDraft)
      setIsGenerating(false)
      setPreviewOpen(true)
      setToastMessage('Draft description generated successfully.')
      setToastOpen(true)
    }, 1300)

    return () => window.clearTimeout(timeoutId)
  }, [isGenerating, keypoints, productName])

  const handleGenerate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setToastMessage('Generating a new product description...')
    setToastOpen(true)
    setIsGenerating(true)
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="section-shell page-shell demo-page-shell">
          <div className="section-heading">
            <h1>Component Demo</h1>
            <p>
              Explore the reusable button, input, modal, toast, and loader components in a realistic product
              description workflow.
            </p>
          </div>

          <div className="ui-demo-grid">
            <form className="ui-demo-form" onSubmit={handleGenerate}>
              <Input
                label="Product name"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Enter a product name"
                hint="Used in the generated description preview."
              />

              <Input
                label="Key points"
                value={keypoints}
                onChange={(event) => setKeypoints(event.target.value)}
                placeholder="Add a few product details"
                hint="Keep it short and specific."
              />

              <div className="ui-demo-actions">
                <Button type="submit" disabled={isGenerating} leftIcon={isGenerating ? <Loader size={16} /> : null}>
                  {isGenerating ? 'Generating' : 'Generate description'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setPreviewOpen(true)}>
                  Open preview
                </Button>
              </div>
            </form>

            <div className="ui-demo-preview">
              <p className="ui-demo-label">Live state</p>
              <h3>{productName}</h3>
              <p>{keypoints}</p>
              <div className="ui-demo-status">
                {isGenerating ? <Loader size={18} label="Generating description" /> : <span>Ready for a new draft.</span>}
              </div>
            </div>
          </div>

          <Model
            open={previewOpen}
            title={productName}
            description="Generated description preview"
            onClose={() => setPreviewOpen(false)}
          >
            <div className="ui-modal__content">
              <p>{draft || 'Generate a draft to see the preview copy here.'}</p>
              <div className="ui-modal__actions">
                <Button type="button" variant="secondary" onClick={() => setPreviewOpen(false)}>
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setToastMessage('Preview copied to workflow.')
                    setToastOpen(true)
                  }}
                >
                  Use draft
                </Button>
              </div>
            </div>
          </Model>

          <Toast
            open={toastOpen}
            title="Product Description Ai"
            message={toastMessage}
            onClose={() => setToastOpen(false)}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Demo