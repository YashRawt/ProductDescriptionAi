import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Input, Loader, Model, Toast } from '../components/ui'
import { api } from '../src/api'

function Demo() {
  const [productName, setProductName] = useState('Premium water bottle')
  const [keypoints, setKeypoints] = useState('Insulated steel, leak proof lid, 24 hour chill')
  const [tone, setTone] = useState('professional')
  const [style, setStyle] = useState('paragraphs')
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'info' | 'warning' | 'error'>('success')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [draft, setDraft] = useState('')

  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!productName.trim()) {
      setToastVariant('error')
      setToastMessage('Product name is required.')
      setToastOpen(true)
      return
    }

    if (!keypoints.trim()) {
      setToastVariant('error')
      setToastMessage('Key points are required.')
      setToastOpen(true)
      return
    }

    setToastVariant('info')
    setToastMessage('Generating product description...')
    setToastOpen(true)
    setIsGenerating(true)

    try {
      const res = await api.generateDescription({
        name: productName,
        keypoints,
        tone,
        style,
      })
      setDraft(res.description)
      setIsGenerating(false)
      setPreviewOpen(true)
      setToastVariant('success')
      setToastMessage('Draft description generated successfully.')
      setToastOpen(true)
    } catch (err: any) {
      setIsGenerating(false)
      setToastVariant('error')
      setToastMessage(err.message || 'Failed to generate description.')
      setToastOpen(true)
    }
  }

  const handleSaveDraft = async () => {
    if (!draft) return
    
    setIsSaving(true)
    setToastVariant('info')
    setToastMessage('Saving description to dashboard...')
    setToastOpen(true)

    try {
      await api.saveDescription({
        name: productName,
        keypoints,
        tone,
        style,
        description: draft,
      })
      setIsSaving(false)
      setPreviewOpen(false)
      setToastVariant('success')
      setToastMessage('Description successfully saved to your Dashboard!')
      setToastOpen(true)
    } catch (err: any) {
      setIsSaving(false)
      setToastVariant('error')
      setToastMessage(err.message || 'Failed to save description.')
      setToastOpen(true)
    }
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="section-shell page-shell demo-page-shell">
          <div className="section-heading">
            <h1>Generate Description</h1>
            <p>
              Make the best description to exist in the platform for your products that eaverybody can get attracted too
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
                hint="Keep it short and specific, separated by commas."
              />

              <label className="ui-field" style={{ display: 'block', marginBottom: '20px' }}>
                <span className="ui-field__label" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tone</span>
                <select
                  value={tone}
                  onChange={(event) => setTone(event.target.value)}
                  className="ui-input"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    height: '42px',
                    borderRadius: '6px',
                    border: '1px solid rgba(57, 122, 71, 0.2)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="professional">Professional</option>
                  <option value="luxury">Luxury</option>
                  <option value="health related">Health related</option>
                  <option value="creative">Creative</option>
                  <option value="friendly">Friendly</option>
                </select>
                <span className="ui-field__help" style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', opacity: 0.8 }}>
                  Shapes the wording and personality of the copy.
                </span>
              </label>

              <label className="ui-field" style={{ display: 'block', marginBottom: '20px' }}>
                <span className="ui-field__label" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Style</span>
                <select
                  value={style}
                  onChange={(event) => setStyle(event.target.value)}
                  className="ui-input"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    height: '42px',
                    borderRadius: '6px',
                    border: '1px solid rgba(57, 122, 71, 0.2)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="bullet points">Bullet points</option>
                  <option value="concise">Concise summary</option>
                </select>
                <span className="ui-field__help" style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', opacity: 0.8 }}>
                  Defines the layout style of the output draft.
                </span>
              </label>

              <div className="ui-demo-actions">
                <Button type="submit" disabled={isGenerating} leftIcon={isGenerating ? <Loader size={16} /> : null}>
                  {isGenerating ? 'Generating' : 'Generate description'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setPreviewOpen(true)} disabled={!draft}>
                  Open preview
                </Button>
              </div>
            </form>

            <div className="ui-demo-preview">
              <p className="ui-demo-label">Live state</p>
              <h3>{productName || 'Unnamed Product'}</h3>
              <p className="meta-info" style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '12px' }}>
                Tone: <strong style={{ textTransform: 'capitalize' }}>{tone}</strong> | Style: <strong style={{ textTransform: 'capitalize' }}>{style}</strong>
              </p>
              <p style={{ minHeight: '60px', fontStyle: draft ? 'normal' : 'italic' }}>
                {draft || 'Your AI generated description will appear here after generation.'}
              </p>
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
              <p style={{ whiteSpace: 'pre-line' }}>{draft || 'Generate a draft to see the preview copy here.'}</p>
              <div className="ui-modal__actions">
                <Button type="button" variant="secondary" onClick={() => setPreviewOpen(false)}>
                  Close
                </Button>
                <Button
                  type="button"
                  disabled={isSaving}
                  leftIcon={isSaving ? <Loader size={16} /> : null}
                  onClick={handleSaveDraft}
                >
                  {isSaving ? 'Saving' : 'Save to Dashboard'}
                </Button>
              </div>
            </div>
          </Model>

          <Toast
            open={toastOpen}
            title="Product Description Ai"
            message={toastMessage}
            variant={toastVariant}
            onClose={() => setToastOpen(false)}
          />
        </section>
      </main>
    </div>
  )
}

export default Demo
