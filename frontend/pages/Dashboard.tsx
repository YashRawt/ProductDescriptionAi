import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Button, Input, Loader, Model, Toast } from '../components/ui'
import { api } from '../src/api'
import type { DescriptionItem, DashboardStats } from '../src/api'
import { getCurrentUser } from '../src/auth'

function Dashboard() {
  const [descriptions, setDescriptions] = useState<DescriptionItem[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [user, setUser] = useState(() => getCurrentUser())
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedToneFilter, setSelectedToneFilter] = useState('')

  // Edit Modal State
  const [editOpen, setEditOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<DescriptionItem | null>(null)
  const [editName, setEditName] = useState('')
  const [editKeypoints, setEditKeypoints] = useState('')
  const [editTone, setEditTone] = useState('professional')
  const [editStyle, setEditStyle] = useState('paragraphs')
  const [editDescription, setEditDescription] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  // Toast notifications State
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'info' | 'warning' | 'error'>('success')

  // Loading state for single card operations
  const [actioningId, setActioningId] = useState<string | null>(null)

  const loadData = async (search = searchTerm, tone = selectedToneFilter) => {
    setIsLoading(true)
    try {
      const [listRes, statsRes] = await Promise.all([
        api.getDescriptions(search || undefined, tone || undefined),
        api.getStats(),
      ])
      setDescriptions(listRes)
      setStats(statsRes)
    } catch (err: any) {
      setToastVariant('error')
      setToastMessage(err.message || 'Failed to load dashboard data.')
      setToastOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setUser(getCurrentUser())
    loadData()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchTerm(val)
    loadData(val, selectedToneFilter)
  }

  const handleToneFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSelectedToneFilter(val)
    loadData(searchTerm, val)
  }

  const openEditModal = (item: DescriptionItem) => {
    setEditingItem(item)
    setEditName(item.name)
    setEditKeypoints(item.keypoints)
    setEditTone(item.tone)
    setEditStyle(item.style)
    setEditDescription(item.description)
    setEditOpen(true)
  }

  const handleUpdate = async () => {
    if (!editingItem) return
    setIsUpdating(true)
    try {
      await api.updateDescription(editingItem.id, {
        name: editName,
        keypoints: editKeypoints,
        tone: editTone,
        style: editStyle,
        description: editDescription,
      })
      setEditOpen(false)
      setToastVariant('success')
      setToastMessage('Product description updated successfully.')
      setToastOpen(true)
      loadData()
    } catch (err: any) {
      setToastVariant('error')
      setToastMessage(err.message || 'Failed to update description.')
      setToastOpen(true)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this saved description?')) {
      return
    }
    setActioningId(id)
    try {
      await api.deleteDescription(id)
      setToastVariant('success')
      setToastMessage('Description deleted successfully.')
      setToastOpen(true)
      loadData()
    } catch (err: any) {
      setToastVariant('error')
      setToastMessage(err.message || 'Failed to delete description.')
      setToastOpen(true)
    } finally {
      setActioningId(null)
    }
  }

  const handleRegenerate = async (id: string) => {
    setActioningId(id)
    setToastVariant('info')
    setToastMessage('Regenerating description using AI...')
    setToastOpen(true)
    try {
      await api.regenerateDescription(id)
      setToastVariant('success')
      setToastMessage('Description regenerated and updated successfully!')
      setToastOpen(true)
      loadData()
    } catch (err: any) {
      setToastVariant('error')
      setToastMessage(err.message || 'Failed to regenerate description.')
      setToastOpen(true)
    } finally {
      setActioningId(null)
    }
  }

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return isoString
    }
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <section className="page-shell" style={{ padding: '40px 0' }}>
          <div className="page-panel" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', alignItems: 'center' }}>
            <div>
              <h1>Dashboard</h1>
              <p>Monitor your copywriting activities, check AI usage, and manage your saved product descriptions.</p>
            </div>
            <div style={{ minWidth: '260px', padding: '16px 18px', borderRadius: '14px', background: 'rgba(57, 122, 71, 0.06)', border: '1px solid rgba(57, 122, 71, 0.16)' }}>
              <p style={{ margin: '0 0 6px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>Authenticated account</p>
              <strong style={{ display: 'block', fontSize: '1rem' }}>{user.email ?? 'Signed in user'}</strong>
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
                {user.exp ? `Session expires ${new Date(user.exp * 1000).toLocaleString()}` : 'Your saved descriptions are connected to this account.'}
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <article className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '16px', border: '1px solid rgba(57, 122, 71, 0.15)' }}>
              <strong style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2f8f46' }}>{stats?.total_generated ?? 0}</strong>
              <span style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>Total Saved Descriptions</span>
            </article>
            <article className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '16px', border: '1px solid rgba(57, 122, 71, 0.15)' }}>
              <strong style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2f8f46' }}>{stats ? Object.keys(stats.tone_counts).length : 0}</strong>
              <span style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>Active Tones Used</span>
            </article>
            <article className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '16px', border: '1px solid rgba(57, 122, 71, 0.15)' }}>
              <strong style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2f8f46' }}>{stats?.tone_counts?.['professional'] ?? 0}</strong>
              <span style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>Professional Drafts</span>
            </article>
            <article className="stat-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: '16px', border: '1px solid rgba(57, 122, 71, 0.15)' }}>
              <strong style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2f8f46' }}>{stats?.tone_counts?.['luxury'] ?? 0}</strong>
              <span style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '8px' }}>Luxury Drafts</span>
            </article>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <Input
                placeholder="Search descriptions by name, keypoints, or body text..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search descriptions"
              />
            </div>
            <div>
              <select
                value={selectedToneFilter}
                onChange={handleToneFilterChange}
                className="ui-input"
                style={{
                  padding: '10px 16px',
                  height: '42px',
                  borderRadius: '6px',
                  border: '1px solid rgba(57, 122, 71, 0.2)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  minWidth: '180px'
                }}
                aria-label="Filter by Tone"
              >
                <option value="">All Tones</option>
                <option value="professional">Professional</option>
                <option value="luxury">Luxury</option>
                <option value="health related">Health related</option>
                <option value="creative">Creative</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
          </div>

          {/* Saved Items List */}
          {isLoading ? (
            <div style={{ display: 'grid', placeItems: 'center', minHeight: '200px' }}>
              <Loader size={36} label="Loading descriptions..." />
            </div>
          ) : descriptions.length === 0 ? (
            <div className="page-panel" style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed rgba(57, 122, 71, 0.2)' }}>
              <h3>No product descriptions found</h3>
              <p>Try clearing your search filters or generate your first description on the Demo page!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {descriptions.map((item) => (
                <article
                  key={item.id}
                  className="visual-card"
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid rgba(57, 122, 71, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative',
                    opacity: actioningId === item.id ? 0.6 : 1,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem' }}>{item.name}</h3>
                      <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>
                        Saved on {formatDate(item.created_at)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span
                        className="chip"
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                          backgroundColor: 'rgba(47, 143, 70, 0.12)',
                          color: '#2f8f46'
                        }}
                      >
                        {item.tone}
                      </span>
                      <span
                        className="chip"
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontWeight: '600',
                          textTransform: 'capitalize',
                          backgroundColor: 'rgba(57, 122, 71, 0.08)',
                          color: '#397a47'
                        }}
                      >
                        {item.style}
                      </span>
                    </div>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.85rem', opacity: 0.9 }}>Key features:</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>{item.keypoints}</p>
                  </div>

                  <hr style={{ border: 'none', borderTop: '1px solid rgba(57, 122, 71, 0.12)', margin: '4px 0' }} />

                  <div>
                    <strong style={{ fontSize: '0.85rem', opacity: 0.9 }}>AI Generated Copy:</strong>
                    <p style={{ margin: '8px 0 0 0', fontSize: '0.95rem', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={actioningId !== null}
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={actioningId !== null}
                      leftIcon={actioningId === item.id ? <Loader size={12} /> : null}
                      onClick={() => handleRegenerate(item.id)}
                    >
                      {actioningId === item.id ? 'Regenerating' : 'Regenerate'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={actioningId !== null}
                      style={{ borderColor: 'rgba(220, 50, 50, 0.3)', color: '#dc3232' }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Edit Modal */}
          <Model
            open={editOpen}
            title={`Edit ${editingItem?.name}`}
            description="Manually edit values or modify the description draft below."
            onClose={() => setEditOpen(false)}
          >
            <div className="ui-modal__content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Product Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Input
                label="Key features"
                value={editKeypoints}
                onChange={(e) => setEditKeypoints(e.target.value)}
              />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label className="ui-field">
                  <span className="ui-field__label" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Tone</span>
                  <select
                    value={editTone}
                    onChange={(e) => setEditTone(e.target.value)}
                    className="ui-input"
                    style={{ width: '100%', padding: '8px 12px', height: '40px', borderRadius: '6px', border: '1px solid rgba(57, 122, 71, 0.2)' }}
                  >
                    <option value="professional">Professional</option>
                    <option value="luxury">Luxury</option>
                    <option value="health related">Health related</option>
                    <option value="creative">Creative</option>
                    <option value="friendly">Friendly</option>
                  </select>
                </label>
                <label className="ui-field">
                  <span className="ui-field__label" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Style</span>
                  <select
                    value={editStyle}
                    onChange={(e) => setEditStyle(e.target.value)}
                    className="ui-input"
                    style={{ width: '100%', padding: '8px 12px', height: '40px', borderRadius: '6px', border: '1px solid rgba(57, 122, 71, 0.2)' }}
                  >
                    <option value="paragraphs">Paragraphs</option>
                    <option value="bullet points">Bullet points</option>
                    <option value="concise">Concise summary</option>
                  </select>
                </label>
              </div>

              <label className="ui-field">
                <span className="ui-field__label" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description</span>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="ui-input"
                  style={{
                    width: '100%',
                    padding: '12px',
                    minHeight: '120px',
                    borderRadius: '6px',
                    border: '1px solid rgba(57, 122, 71, 0.2)',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: '1.6'
                  }}
                />
              </label>

              <div className="ui-modal__actions" style={{ marginTop: '8px' }}>
                <Button type="button" variant="secondary" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={isUpdating}
                  leftIcon={isUpdating ? <Loader size={16} /> : null}
                  onClick={handleUpdate}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Model>

          {/* Toast system notifications */}
          <Toast
            open={toastOpen}
            title="Dashboard Alert"
            message={toastMessage}
            variant={toastVariant}
            onClose={() => setToastOpen(false)}
          />
        </section>
      </main>
    </div>
  )
}

export default Dashboard
