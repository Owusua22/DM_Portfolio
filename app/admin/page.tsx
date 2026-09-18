'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import {
  GalleryItem,
  CaseForm,
  ProjectForm,
  UGCForm,
  emptyCaseForm,
  emptyProjectForm,
  emptyDesignForm,
  emptyUGCForm,
  MediaKind,
} from '@/lib/types'

/* ------------------------------------------------------------------ */
/* Tokens                                                             */
/* ------------------------------------------------------------------ */
const ACCENT = '#f97316'
const ACCENT_DARK = '#ea580c'
const INK = '#0f2f2a'
const MUTED = '#4b625d'
const LINE = 'rgba(15,47,42,0.10)'
const SOFT = '#f4f7f6'
const PAGE_BG = '#f6f8f7'
const DANGER = '#dc2626'
const SUCCESS = '#16a34a'

/* ------------------------------------------------------------------ */
/* Config                                                             */
/* ------------------------------------------------------------------ */
const TABS = [
  { key: 'caseStudies',    label: 'Case Studies',    table: 'case_studies',    bucket: 'case-studies',    icon: 'bi-journal-richtext', imageField: 'media_url' },
  { key: 'projects',       label: 'Projects',        table: 'projects',        bucket: 'projects',        icon: 'bi-kanban',           imageField: 'media_url' },
  { key: 'graphicDesigns', label: 'Graphic Designs', table: 'graphic_designs', bucket: 'graphic-designs', icon: 'bi-palette',          imageField: 'image_url' },
  { key: 'ugcVideos',      label: 'UGC Videos',      table: 'ugc_videos',      bucket: 'ugc-videos',      icon: 'bi-camera-video',     imageField: 'thumbnail_url' },
  { key: 'gallery',        label: 'Gallery',         table: 'gallery',         bucket: 'gallery',         icon: 'bi-images',           imageField: 'url' },
] as const

type TabKey = (typeof TABS)[number]['key']

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const toSnakeCase = (obj: Record<string, any>) => {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) out[k.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)] = v
  return out
}
const arrayFromCSV = (v: string) => v.split(',').map((s) => s.trim()).filter(Boolean)
const csvValue = (v: unknown) => (Array.isArray(v) ? v.join(', ') : typeof v === 'string' ? v : '')

const initialFormFor = (tab: TabKey): any => {
  switch (tab) {
    case 'caseStudies':    return { ...emptyCaseForm }
    case 'projects':       return { ...emptyProjectForm }
    case 'graphicDesigns': return { ...emptyDesignForm }
    case 'ugcVideos':      return { ...emptyUGCForm }
    case 'gallery':        return { title: '', kind: 'image' as MediaKind, url: '' }
    default:               return {}
  }
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_BYTES = 5 * 1024 * 1024
const validateFile = (file: File): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) return 'Only JPEG, PNG, WebP and GIF images are allowed.'
  if (file.size > MAX_SIZE_BYTES) return 'File must be under 5 MB.'
  return null
}

function useViewport() {
  const [width, setWidth] = useState(1200)
  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return width
}

/* ------------------------------------------------------------------ */
/* UI primitives                                                      */
/* ------------------------------------------------------------------ */
const fieldBase = (focus: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '0 12px',
  height: 42,
  borderRadius: 10,
  border: `1.5px solid ${focus ? ACCENT : LINE}`,
  boxShadow: focus ? '0 0 0 3px rgba(249,115,22,0.16)' : 'none',
  background: '#fff',
  fontSize: 14,
  color: INK,
  outline: 'none',
  transition: 'border-color .2s ease, box-shadow .2s ease',
})

function Input({ style, onFocus, onBlur, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focus, setFocus] = useState(false)
  return (
    <input
      {...props}
      onFocus={(e) => { setFocus(true); onFocus?.(e) }}
      onBlur={(e) => { setFocus(false); onBlur?.(e) }}
      style={{ ...fieldBase(focus), ...style }}
    />
  )
}

function Textarea({ style, onFocus, onBlur, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focus, setFocus] = useState(false)
  return (
    <textarea
      {...props}
      onFocus={(e) => { setFocus(true); onFocus?.(e) }}
      onBlur={(e) => { setFocus(false); onBlur?.(e) }}
      style={{ ...fieldBase(focus), height: 'auto', minHeight: 88, padding: '10px 12px', lineHeight: 1.6, resize: 'vertical', ...style }}
    />
  )
}

function Select({ style, onFocus, onBlur, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focus, setFocus] = useState(false)
  return (
    <select
      {...props}
      onFocus={(e) => { setFocus(true); onFocus?.(e) }}
      onBlur={(e) => { setFocus(false); onBlur?.(e) }}
      style={{
        ...fieldBase(focus),
        appearance: 'none',
        WebkitAppearance: 'none',
        paddingRight: 36,
        cursor: 'pointer',
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%234b625d' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        textTransform: 'capitalize',
        ...style,
      }}
    >
      {children}
    </select>
  )
}

function Field({ label, hint, span = 1, children }: { label: string; hint?: string; span?: 1 | 2 | 3; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: `span ${span}`, minWidth: 0 }}>
      <label style={{ display: 'block', marginBottom: 6, fontSize: 12.5, fontWeight: 700, color: INK, letterSpacing: '0.01em' }}>{label}</label>
      {children}
      {hint && <div style={{ marginTop: 5, fontSize: 11.5, color: MUTED }}>{hint}</div>}
    </div>
  )
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        height: 42,
        padding: '0 12px 0 6px',
        borderRadius: 10,
        border: `1.5px solid ${checked ? 'rgba(249,115,22,0.4)' : LINE}`,
        background: checked ? 'rgba(249,115,22,0.08)' : '#fff',
        cursor: 'pointer',
        transition: 'all .2s ease',
      }}
    >
      <span
        style={{
          position: 'relative',
          width: 38,
          height: 22,
          borderRadius: 999,
          background: checked ? ACCENT : 'rgba(15,47,42,0.2)',
          transition: 'background .2s ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 19 : 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
            transition: 'left .2s ease',
          }}
        />
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{label}</span>
    </button>
  )
}

type BtnVariant = 'solid' | 'outline' | 'ghost' | 'danger'
function Btn({
  variant = 'solid', size = 'md', icon, loading, children, style, disabled, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: 'sm' | 'md'; icon?: string; loading?: boolean }) {
  const [hover, setHover] = useState(false)
  const h = size === 'sm' ? 36 : 44
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: h,
    padding: size === 'sm' ? '0 14px' : '0 20px',
    borderRadius: 999,
    fontSize: size === 'sm' ? 13 : 14,
    fontWeight: 700,
    whiteSpace: 'nowrap',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'all .22s ease',
    border: '1.5px solid transparent',
    outline: 'none',
  }
  const variants: Record<BtnVariant, React.CSSProperties> = {
    solid: {
      color: '#fff',
      background: hover ? `linear-gradient(135deg, ${ACCENT_DARK}, ${ACCENT})` : `linear-gradient(135deg, ${ACCENT}, #fb923c)`,
      boxShadow: hover ? '0 12px 24px rgba(249,115,22,0.36)' : '0 6px 16px rgba(249,115,22,0.26)',
      transform: hover && !disabled ? 'translateY(-2px)' : 'none',
    },
    outline: {
      color: hover ? '#fff' : ACCENT,
      background: hover ? ACCENT : '#fff',
      borderColor: ACCENT,
    },
    ghost: {
      color: hover ? INK : MUTED,
      background: hover ? SOFT : 'transparent',
    },
    danger: {
      color: '#fff',
      background: hover ? '#b91c1c' : DANGER,
      boxShadow: hover ? '0 10px 22px rgba(220,38,38,0.32)' : 'none',
    },
  }
  return (
    <button
      {...props}
      disabled={disabled || loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {loading ? (
        <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'admSpin .7s linear infinite' }} />
      ) : icon ? (
        <i className={`bi ${icon}`} aria-hidden="true" />
      ) : null}
      {children}
    </button>
  )
}

function IconBtn({ icon, label, tone = 'neutral', onClick }: { icon: string; label: string; tone?: 'neutral' | 'danger' | 'accent'; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  const color = tone === 'danger' ? DANGER : tone === 'accent' ? ACCENT : INK
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 36,
        height: 36,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 10,
        border: `1px solid ${hover ? color : LINE}`,
        background: hover ? (tone === 'danger' ? 'rgba(220,38,38,0.08)' : 'rgba(249,115,22,0.08)') : '#fff',
        color: hover ? color : MUTED,
        cursor: 'pointer',
        fontSize: 15,
        transition: 'all .2s ease',
      }}
    >
      <i className={`bi ${icon}`} aria-hidden="true" />
    </button>
  )
}

function SectionLabel({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '6px 0 14px' }}>
      <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: 8, background: 'rgba(249,115,22,0.12)', color: ACCENT, fontSize: 14 }}>
        <i className={`bi ${icon}`} aria-hidden="true" />
      </span>
      <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  )
}

function Thumb({ src, kind, size = 48 }: { src?: string; kind?: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        overflow: 'hidden',
        background: SOFT,
        border: `1px solid ${LINE}`,
        display: 'grid',
        placeItems: 'center',
        color: MUTED,
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {src ? (
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <i className="bi bi-image" aria-hidden="true" style={{ fontSize: size * 0.4 }} />
      )}
      {kind === 'video' && (
        <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(15,47,42,0.35)', color: '#fff', fontSize: size * 0.4 }}>
          <i className="bi bi-play-fill" aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

function Modal({ title, subtitle, onClose, isMobile, width = 760, children, footer }: {
  title: string; subtitle?: string; onClose: () => void; isMobile: boolean; width?: number; children: React.ReactNode; footer?: React.ReactNode
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h) }
  }, [onClose])

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : 20,
        background: 'rgba(15,47,42,0.55)',
        backdropFilter: 'blur(4px)',
        animation: 'admFade .2s ease',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          width: '100%',
          maxWidth: width,
          maxHeight: isMobile ? '94vh' : '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          borderRadius: isMobile ? '22px 22px 0 0' : 20,
          boxShadow: '0 30px 80px rgba(15,47,42,0.35)',
          overflow: 'hidden',
          animation: isMobile ? 'admSheet .3s cubic-bezier(.2,.8,.2,1)' : 'admPop .25s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: isMobile ? '16px 16px 12px' : '20px 24px 16px', borderBottom: `1px solid ${LINE}` }}>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', color: INK }}>{title}</h3>
            {subtitle && <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{subtitle}</div>}
          </div>
          <IconBtn icon="bi-x-lg" label="Close" tone="accent" onClick={onClose} />
        </div>
        <div style={{ overflowY: 'auto', padding: isMobile ? 16 : 24, overscrollBehavior: 'contain' }}>{children}</div>
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: isMobile ? '12px 16px calc(14px + env(safe-area-inset-bottom))' : '14px 24px', borderTop: `1px solid ${LINE}`, background: '#fbfcfc' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function AdminPage() {
  const width = useViewport()
  const isMobile = width < 640
  const isTablet = width < 960

  const [activeTab, setActiveTab] = useState<TabKey>('caseStudies')
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>(initialFormFor('caseStudies'))
  const [editingId, setEditingId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState<{ type: 'error' | 'success'; msg: string } | null>(null)

  const tabConfig = TABS.find((t) => t.key === activeTab)!
  const imageField = tabConfig.imageField
  const hasFeatured = activeTab !== 'gallery'

  const notify = (type: 'error' | 'success', msg: string) => setToast({ type, msg })
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(t)
  }, [toast])

  /* ----- Fetch ----- */
  const fetchItems = useCallback(async () => {
    setLoading(true)
    let result = await supabase.from(tabConfig.table).select('*').order('created_at', { ascending: false })
    if (result.error) result = await supabase.from(tabConfig.table).select('*')
    if (result.error) notify('error', result.error.message)
    else setItems(result.data || [])
    setLoading(false)
  }, [tabConfig.table])

  useEffect(() => {
    fetchItems()
    setForm(initialFormFor(activeTab))
    setEditingId(null)
    setSearch('')
  }, [activeTab, fetchItems])

  /* ----- Upload ----- */
  const uploadFile = async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { data, error: upErr } = await supabase.storage.from(tabConfig.bucket).upload(`public/${fileName}`, file, { upsert: false })
    if (upErr) throw upErr
    return supabase.storage.from(tabConfig.bucket).getPublicUrl(data.path).data.publicUrl
  }

  const change = (name: string, value: any) => setForm((prev: any) => ({ ...prev, [name]: value }))

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const err = validateFile(file)
    if (err) return notify('error', err)
    try {
      setUploading(true)
      change(imageField, await uploadFile(file))
      notify('success', 'Image uploaded')
    } catch (err: any) {
      notify('error', err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  /* ----- Submit ----- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title?.trim()) return notify('error', 'Title is required')
    setSaving(true)
    try {
      const payload: any = { ...form }
      delete payload.id
      delete payload.created_at
      delete payload.updated_at
      if (typeof payload.services === 'string') payload.services = arrayFromCSV(payload.services)
      if (typeof payload.tools === 'string') payload.tools = arrayFromCSV(payload.tools)
      const snake = toSnakeCase(payload)

      const { error } = editingId
        ? await supabase.from(tabConfig.table).update(snake).eq('id', editingId)
        : await supabase.from(tabConfig.table).insert(snake)
      if (error) throw error

      setModalOpen(false)
      notify('success', editingId ? 'Item updated' : 'Item created')
      await fetchItems()
    } catch (err: any) {
      notify('error', err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  /* ----- Delete ----- */
  const confirmDelete = async () => {
    if (!confirmId) return
    const { error } = await supabase.from(tabConfig.table).delete().eq('id', confirmId)
    setConfirmId(null)
    if (error) notify('error', error.message)
    else { notify('success', 'Item deleted'); await fetchItems() }
  }

  /* ----- Quick featured toggle ----- */
  const toggleFeatured = async (item: any) => {
    const { error } = await supabase.from(tabConfig.table).update({ is_featured: !item.is_featured }).eq('id', item.id)
    if (error) notify('error', error.message)
    else setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_featured: !item.is_featured } : i)))
  }

  const handleEdit = (item: any) => { setEditingId(item.id); setForm({ ...item }); setModalOpen(true) }
  const handleAdd = () => { setEditingId(null); setForm(initialFormFor(activeTab)); setModalOpen(true) }

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => [i.title, i.category, i.client, i.platform].filter(Boolean).some((v: string) => String(v).toLowerCase().includes(q)))
  }, [items, search])

  const cols = isTablet ? 1 : 2

  /* ------------------------------------------------------------------ */
  /* Form sections                                                      */
  /* ------------------------------------------------------------------ */
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 14 }
  const span2 = (cols === 1 ? 1 : 2) as 1 | 2

  const renderCommonFields = () => (
    <>
      <SectionLabel icon="bi-card-heading">Basics</SectionLabel>
      <div style={grid}>
        <Field label="Title" span={activeTab === 'gallery' ? span2 : 1}>
          <Input value={form.title ?? ''} onChange={(e) => change('title', e.target.value)} placeholder="Give it a clear, descriptive title" />
        </Field>
        {activeTab !== 'gallery' && (
          <>
            <Field label="Category">
              <Input value={form.category ?? ''} onChange={(e) => change('category', e.target.value)} placeholder="e.g. SEO, Social Media" />
            </Field>
            <Field label="Date">
              <Input type="date" value={form.date ?? ''} onChange={(e) => change('date', e.target.value)} />
            </Field>
            <Field label="Visibility">
              <Toggle checked={!!form.is_featured} onChange={(v) => change('is_featured', v)} label="Featured on portfolio" />
            </Field>
          </>
        )}
        {activeTab !== 'gallery' && (
          <Field label={activeTab === 'caseStudies' ? 'Summary' : 'Description'} span={span2}>
            <Textarea
              rows={3}
              value={(activeTab === 'caseStudies' ? form.summary : form.description) ?? ''}
              onChange={(e) => change(activeTab === 'caseStudies' ? 'summary' : 'description', e.target.value)}
              placeholder="Short overview shown on the card and at the top of the details view"
            />
          </Field>
        )}
      </div>

      <div style={{ height: 22 }} />
      <SectionLabel icon="bi-image">Media</SectionLabel>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        <Thumb src={form[imageField]} kind={form.media_kind ?? form.kind} size={isMobile ? 72 : 96} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <Field label="Image URL" hint="Paste a URL or upload a JPEG / PNG / WebP / GIF under 5 MB">
            <div style={{ display: 'flex', gap: 8 }}>
              <Input value={form[imageField] ?? ''} onChange={(e) => change(imageField, e.target.value)} placeholder="https://…" />
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 42,
                  padding: '0 16px',
                  borderRadius: 10,
                  border: `1.5px solid ${ACCENT}`,
                  color: ACCENT,
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: uploading ? 'wait' : 'pointer',
                  whiteSpace: 'nowrap',
                  background: 'rgba(249,115,22,0.06)',
                }}
              >
                {uploading
                  ? <span style={{ width: 14, height: 14, border: `2px solid rgba(249,115,22,0.3)`, borderTopColor: ACCENT, borderRadius: '50%', animation: 'admSpin .7s linear infinite' }} />
                  : <i className="bi bi-cloud-arrow-up" aria-hidden="true" />}
                {isMobile ? '' : uploading ? 'Uploading…' : 'Upload'}
                <input type="file" accept={ALLOWED_TYPES.join(',')} style={{ display: 'none' }} onChange={handleFile} disabled={uploading} />
              </label>
            </div>
          </Field>
        </div>
      </div>
    </>
  )

  const renderTabSpecificFields = () => {
    switch (activeTab) {
      case 'caseStudies': {
        const f = form as CaseForm & Record<string, any>
        return (
          <>
            <div style={{ height: 22 }} />
            <SectionLabel icon="bi-briefcase">Client & Outcome</SectionLabel>
            <div style={grid}>
              <Field label="Client"><Input value={f.client ?? ''} onChange={(e) => change('client', e.target.value)} /></Field>
              <Field label="Year"><Input value={f.year ?? ''} onChange={(e) => change('year', e.target.value)} placeholder="2025" /></Field>
              <Field label="Label"><Input value={f.label ?? ''} onChange={(e) => change('label', e.target.value)} placeholder="e.g. Growth campaign" /></Field>
              <Field label="Accent">
                <Select value={f.accent ?? 'sage'} onChange={(e) => change('accent', e.target.value)}>
                  {['sage', 'aqua', 'ink', 'sand'].map((o) => <option key={o}>{o}</option>)}
                </Select>
              </Field>
              <Field label="Result" hint="One-line headline result"><Input value={f.result ?? ''} onChange={(e) => change('result', e.target.value)} /></Field>
              <Field label="Impact label" hint="Shown as the highlighted metric, e.g. “+142% organic traffic”"><Input value={f.impact_label ?? ''} onChange={(e) => change('impact_label', e.target.value)} /></Field>
            </div>

            <div style={{ height: 22 }} />
            <SectionLabel icon="bi-list-check">STAR breakdown</SectionLabel>
            <div style={grid}>
              <Field label="Situation"><Textarea rows={3} value={f.situation ?? ''} onChange={(e) => change('situation', e.target.value)} /></Field>
              <Field label="Task"><Textarea rows={3} value={f.task ?? ''} onChange={(e) => change('task', e.target.value)} /></Field>
              <Field label="Action"><Textarea rows={3} value={f.action ?? ''} onChange={(e) => change('action', e.target.value)} /></Field>
              <Field label="Results"><Textarea rows={3} value={f.results ?? ''} onChange={(e) => change('results', e.target.value)} /></Field>
            </div>

            <div style={{ height: 22 }} />
            <SectionLabel icon="bi-tags">Tags & Links</SectionLabel>
            <div style={grid}>
              <Field label="Services" hint="Comma separated"><Input value={csvValue(f.services)} onChange={(e) => change('services', e.target.value)} placeholder="SEO, Content Strategy" /></Field>
              <Field label="Tools" hint="Comma separated"><Input value={csvValue(f.tools)} onChange={(e) => change('tools', e.target.value)} placeholder="Semrush, GA4, HubSpot" /></Field>
              <Field label="Drive URL"><Input value={f.drive_url ?? ''} onChange={(e) => change('drive_url', e.target.value)} placeholder="https://drive.google.com/…" /></Field>
              <Field label="Media kind">
                <Select value={f.media_kind ?? 'image'} onChange={(e) => change('media_kind', e.target.value)}>
                  <option>image</option><option>video</option>
                </Select>
              </Field>
              <Field label="Status" span={span2}>
                <Toggle checked={!!f.is_concept} onChange={(v) => change('is_concept', v)} label="Concept project (not a live client)" />
              </Field>
            </div>
          </>
        )
      }
      case 'projects': {
        const f = form as ProjectForm & Record<string, any>
        return (
          <>
            <div style={{ height: 22 }} />
            <SectionLabel icon="bi-kanban">Project details</SectionLabel>
            <div style={grid}>
              <Field label="Role"><Input value={f.role ?? ''} onChange={(e) => change('role', e.target.value)} placeholder="e.g. Strategy & execution" /></Field>
              <Field label="Project URL"><Input value={f.project_url ?? ''} onChange={(e) => change('project_url', e.target.value)} placeholder="https://…" /></Field>
              <Field label="Tools" hint="Comma separated"><Input value={csvValue(f.tools)} onChange={(e) => change('tools', e.target.value)} /></Field>
              <Field label="Media kind">
                <Select value={f.media_kind ?? 'image'} onChange={(e) => change('media_kind', e.target.value)}>
                  <option>image</option><option>video</option>
                </Select>
              </Field>
            </div>
          </>
        )
      }
      case 'ugcVideos': {
        const f = form as UGCForm & Record<string, any>
        return (
          <>
            <div style={{ height: 22 }} />
            <SectionLabel icon="bi-camera-video">Video details</SectionLabel>
            <div style={grid}>
              <Field label="Platform"><Input value={f.platform ?? ''} onChange={(e) => change('platform', e.target.value)} placeholder="TikTok, Instagram Reels…" /></Field>
              <Field label="Video URL" hint="YouTube, Vimeo or direct MP4 link"><Input value={f.video_url ?? ''} onChange={(e) => change('video_url', e.target.value)} placeholder="https://…" /></Field>
            </div>
          </>
        )
      }
      case 'gallery': {
        const f = form as GalleryItem & Record<string, any>
        return (
          <>
            <div style={{ height: 22 }} />
            <SectionLabel icon="bi-images">Gallery</SectionLabel>
            <div style={grid}>
              <Field label="Kind">
                <Select value={f.kind ?? 'image'} onChange={(e) => change('kind', e.target.value)}>
                  <option>image</option><option>video</option>
                </Select>
              </Field>
            </div>
          </>
        )
      }
      default:
        return null
    }
  }

  /* ------------------------------------------------------------------ */
  /* Rows                                                               */
  /* ------------------------------------------------------------------ */
  const renderRowActions = (item: any) => (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
      {hasFeatured && (
        <IconBtn icon={item.is_featured ? 'bi-star-fill' : 'bi-star'} label={item.is_featured ? 'Unfeature' : 'Feature'} tone="accent" onClick={() => toggleFeatured(item)} />
      )}
      {item[imageField] && <IconBtn icon="bi-box-arrow-up-right" label="Open media" onClick={() => window.open(item[imageField], '_blank')} />}
      <IconBtn icon="bi-pencil" label="Edit" tone="accent" onClick={() => handleEdit(item)} />
      <IconBtn icon="bi-trash" label="Delete" tone="danger" onClick={() => setConfirmId(item.id)} />
    </div>
  )

  const CategoryChip = ({ v }: { v?: string }) =>
    v ? <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: 999, background: 'rgba(249,115,22,0.10)', color: ACCENT_DARK, fontSize: 11.5, fontWeight: 700 }}>{v}</span> : <span style={{ color: MUTED }}>—</span>

  /* ------------------------------------------------------------------ */
  /* UI                                                                 */
  /* ------------------------------------------------------------------ */
  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, color: INK, fontFamily: 'inherit' }}>
      <style>{`
        @keyframes admSpin { to { transform: rotate(360deg); } }
        @keyframes admFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes admPop { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes admSheet { from { transform: translateY(100%); } to { transform: none; } }
        @keyframes admShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes admToast { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      `}</style>

      {/* ---------- Top bar ---------- */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '12px 16px' : '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <span style={{ width: 40, height: 40, display: 'grid', placeItems: 'center', borderRadius: 12, background: `linear-gradient(135deg, ${ACCENT}, #fb923c)`, color: '#fff', fontSize: 18, boxShadow: '0 8px 18px rgba(249,115,22,0.3)', flexShrink: 0 }}>
              <i className="bi bi-speedometer2" aria-hidden="true" />
            </span>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ margin: 0, fontSize: isMobile ? 17 : 20, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Portfolio Admin</h1>
              {!isMobile && <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>Manage case studies, projects, designs, UGC and gallery items.</div>}
            </div>
          </div>
          <Btn icon="bi-plus-lg" onClick={handleAdd} size={isMobile ? 'sm' : 'md'}>{isMobile ? 'Add' : 'Add New'}</Btn>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '16px 16px 80px' : '24px 24px 80px' }}>
        {/* ---------- Tabs ---------- */}
        <div role="tablist" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '2px 2px 12px', marginBottom: 16 }}>
          {TABS.map((t) => {
            const active = t.key === activeTab
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(t.key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 42,
                  padding: '0 16px',
                  borderRadius: 999,
                  border: `1px solid ${active ? ACCENT : LINE}`,
                  background: active ? `linear-gradient(135deg, ${ACCENT}, #fb923c)` : '#fff',
                  color: active ? '#fff' : INK,
                  fontSize: 13.5,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: active ? '0 10px 22px rgba(249,115,22,0.28)' : '0 2px 8px rgba(15,47,42,0.04)',
                  transition: 'all .22s ease',
                }}
              >
                <i className={`bi ${t.icon}`} aria-hidden="true" style={{ color: active ? '#fff' : ACCENT }} />
                {t.label}
                {active && (
                  <span style={{ minWidth: 22, height: 22, padding: '0 6px', display: 'grid', placeItems: 'center', borderRadius: 999, background: 'rgba(255,255,255,0.25)', fontSize: 11.5, fontWeight: 800 }}>
                    {loading ? '…' : items.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ---------- Panel ---------- */}
        <section style={{ background: '#fff', borderRadius: 20, border: `1px solid ${LINE}`, boxShadow: '0 10px 30px rgba(15,47,42,0.06)', overflow: 'hidden' }}>
          {/* toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: isMobile ? 14 : '16px 20px', borderBottom: `1px solid ${LINE}`, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{tabConfig.label}</h2>
              <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>{visible.length} of {items.length} item{items.length === 1 ? '' : 's'}</div>
            </div>
            <div style={{ position: 'relative', flex: isMobile ? '1 1 100%' : '0 1 300px' }}>
              <i className="bi bi-search" aria-hidden="true" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: MUTED, fontSize: 14, pointerEvents: 'none' }} />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title, category…" style={{ paddingLeft: 36, height: 40 }} />
            </div>
          </div>

          {/* content */}
          {loading ? (
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ height: 60, borderRadius: 12, background: 'linear-gradient(90deg, #eef2f1 25%, #f7f9f8 50%, #eef2f1 75%)', backgroundSize: '200% 100%', animation: 'admShimmer 1.4s infinite' }} />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div style={{ padding: '56px 24px', textAlign: 'center' }}>
              <span style={{ width: 64, height: 64, display: 'inline-grid', placeItems: 'center', borderRadius: 18, background: 'rgba(249,115,22,0.10)', color: ACCENT, fontSize: 28, marginBottom: 14 }}>
                <i className={`bi ${search ? 'bi-search' : 'bi-folder2-open'}`} aria-hidden="true" />
              </span>
              <div style={{ fontWeight: 800 }}>{search ? 'No matches' : `No ${tabConfig.label.toLowerCase()} yet`}</div>
              <div style={{ fontSize: 14, color: MUTED, margin: '6px 0 18px' }}>{search ? 'Try a different search term.' : 'Create your first entry to see it on the portfolio.'}</div>
              {!search && <Btn icon="bi-plus-lg" onClick={handleAdd} size="sm">Add {tabConfig.label.replace(/s$/, '')}</Btn>}
            </div>
          ) : isTablet ? (
            /* ---- mobile / tablet cards ---- */
            <ul style={{ listStyle: 'none', margin: 0, padding: 12, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0,1fr))', gap: 10 }}>
              {visible.map((item) => (
                <li key={item.id} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 14, border: `1px solid ${LINE}`, background: '#fff' }}>
                  <Thumb src={item[imageField]} kind={item.media_kind ?? item.kind} size={64} />
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0, fontWeight: 800, fontSize: 14.5, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                      {item.is_featured && <i className="bi bi-star-fill" aria-label="Featured" style={{ color: ACCENT, fontSize: 13, flexShrink: 0 }} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 12, color: MUTED }}>
                      <CategoryChip v={item.category} />
                      {item.date && <span><i className="bi bi-calendar3" aria-hidden="true" style={{ marginRight: 4 }} />{item.date}</span>}
                    </div>
                    {renderRowActions(item)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            /* ---- desktop table ---- */
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: SOFT }}>
                    {['Item', 'Category', 'Date', hasFeatured ? 'Featured' : null, 'Actions'].filter(Boolean).map((h, i, arr) => (
                      <th key={h as string} style={{ padding: '12px 20px', textAlign: i === arr.length - 1 ? 'right' : h === 'Featured' ? 'center' : 'left', fontSize: 11.5, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, borderBottom: `1px solid ${LINE}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((item) => (
                    <tr
                      key={item.id}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#fbfcfc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      style={{ transition: 'background .15s ease' }}
                    >
                      <td style={{ padding: '12px 20px', borderBottom: `1px solid ${LINE}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                          <Thumb src={item[imageField]} kind={item.media_kind ?? item.kind} />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 380 }}>{item.title}</div>
                            {(item.client || item.platform || item.role) && (
                              <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{item.client || item.platform || item.role}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 20px', borderBottom: `1px solid ${LINE}` }}><CategoryChip v={item.category} /></td>
                      <td style={{ padding: '12px 20px', borderBottom: `1px solid ${LINE}`, fontSize: 13, color: MUTED, whiteSpace: 'nowrap' }}>{item.date ?? '—'}</td>
                      {hasFeatured && (
                        <td style={{ padding: '12px 20px', borderBottom: `1px solid ${LINE}`, textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => toggleFeatured(item)}
                            aria-label={item.is_featured ? 'Unfeature' : 'Feature'}
                            style={{ width: 34, height: 34, borderRadius: 10, border: 0, background: item.is_featured ? 'rgba(249,115,22,0.12)' : 'transparent', color: item.is_featured ? ACCENT : 'rgba(15,47,42,0.25)', fontSize: 16, cursor: 'pointer', transition: 'all .2s ease' }}
                          >
                            <i className={`bi ${item.is_featured ? 'bi-star-fill' : 'bi-star'}`} aria-hidden="true" />
                          </button>
                        </td>
                      )}
                      <td style={{ padding: '12px 20px', borderBottom: `1px solid ${LINE}` }}>{renderRowActions(item)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ---------- Form modal ---------- */}
      {modalOpen && (
        <Modal
          title={editingId ? `Edit ${tabConfig.label.replace(/s$/, '')}` : `New ${tabConfig.label.replace(/s$/, '')}`}
          subtitle={editingId ? 'Changes go live on the portfolio as soon as you save.' : 'Fill in the details below. Only the title is required.'}
          onClose={() => setModalOpen(false)}
          isMobile={isMobile}
          footer={
            <>
              <Btn variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Btn>
              <Btn type="submit" form="admin-form" icon="bi-check2" loading={saving}>{editingId ? 'Save changes' : 'Create item'}</Btn>
            </>
          }
        >
          <form id="admin-form" onSubmit={handleSubmit}>
            {renderCommonFields()}
            {renderTabSpecificFields()}
          </form>
        </Modal>
      )}

      {/* ---------- Delete confirm ---------- */}
      {confirmId && (
        <Modal title="Delete this item?" onClose={() => setConfirmId(null)} isMobile={isMobile} width={440}
          footer={
            <>
              <Btn variant="ghost" type="button" onClick={() => setConfirmId(null)}>Keep it</Btn>
              <Btn variant="danger" type="button" icon="bi-trash" onClick={confirmDelete}>Delete</Btn>
            </>
          }
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: 12, background: 'rgba(220,38,38,0.10)', color: DANGER, fontSize: 20, flexShrink: 0 }}>
              <i className="bi bi-exclamation-triangle" aria-hidden="true" />
            </span>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 4 }}>{items.find((i) => i.id === confirmId)?.title ?? 'This item'}</div>
              <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>It will be removed from the portfolio immediately. This action cannot be undone.</div>
            </div>
          </div>
        </Modal>
      )}

      {/* ---------- Toast ---------- */}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            left: isMobile ? 16 : 'auto',
            right: 16,
            bottom: `calc(16px + env(safe-area-inset-bottom))`,
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            borderRadius: 14,
            background: INK,
            color: '#fff',
            fontSize: 13.5,
            fontWeight: 600,
            boxShadow: '0 16px 40px rgba(15,47,42,0.3)',
            borderLeft: `4px solid ${toast.type === 'error' ? DANGER : SUCCESS}`,
            animation: 'admToast .25s ease',
            maxWidth: 420,
          }}
        >
          <i className={`bi ${toast.type === 'error' ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}`} aria-hidden="true" style={{ color: toast.type === 'error' ? '#fca5a5' : '#86efac', fontSize: 16 }} />
          <span style={{ flex: 1 }}>{toast.msg}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss" style={{ background: 'transparent', border: 0, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: 14 }}>
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}