'use client'

import { useState, useEffect, useCallback } from 'react'
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
/* Config                                                             */
/* ------------------------------------------------------------------ */

const TABS = [
  { key: 'caseStudies', label: 'Case Studies', table: 'case_studies', bucket: 'case-studies' },
  { key: 'projects',    label: 'Projects',     table: 'projects',    bucket: 'projects' },
  { key: 'graphicDesigns', label: 'Graphic Designs', table: 'graphic_designs', bucket: 'graphic-designs' },
  { key: 'ugcVideos',   label: 'UGC Videos',   table: 'ugc_videos',  bucket: 'ugc-videos' },
  { key: 'gallery',     label: 'Gallery',      table: 'gallery',     bucket: 'gallery' },
] as const

type TabKey = (typeof TABS)[number]['key']

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const toSnakeCase = (obj: Record<string, any>) => {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    out[k.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)] = v
  }
  return out
}

const toCamelCase = (obj: Record<string, any>) => {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v
  }
  return out
}

const arrayFromCSV = (v: string) => v.split(',').map((s) => s.trim()).filter(Boolean)

const initialFormFor = (tab: TabKey) => {
  switch (tab) {
    case 'caseStudies': return { ...emptyCaseForm }
    case 'projects': return { ...emptyProjectForm }
    case 'graphicDesigns': return { ...emptyDesignForm }
    case 'ugcVideos': return { ...emptyUGCForm }
    case 'gallery': return { title: '', kind: 'image' as MediaKind, url: '' }
    default: return {}
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('caseStudies')
  const [items, setItems] = useState<any[]>([])
  const [form, setForm] = useState<any>(initialFormFor('caseStudies'))
  const [editingId, setEditingId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tabConfig = TABS.find((t) => t.key === activeTab)!

  /* ----- Fetch ----- */
  const fetchItems = useCallback(async () => {
    setLoading(true)
    let result = await supabase
      .from(tabConfig.table)
      .select('*')
      .order('created_at', { ascending: false })

    if (result.error) {
      result = await supabase
        .from(tabConfig.table)
        .select('*')
    }

    if (result.error) setError(result.error.message)
    else setItems((result.data || []).map(toCamelCase))
    setLoading(false)
  }, [tabConfig.table])

  useEffect(() => {
    fetchItems()
    setForm(initialFormFor(activeTab))
    setEditingId(null)
  }, [activeTab, fetchItems])

  /* ----- File upload ----- */
  const uploadFile = async (file: File) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const { data, error: upErr } = await supabase.storage
      .from(tabConfig.bucket)
      .upload(`public/${fileName}`, file, { upsert: false })
    if (upErr) throw upErr

    const { data: urlData } = supabase.storage
      .from(tabConfig.bucket)
      .getPublicUrl(data.path)
    return urlData.publicUrl
  }

  /* ----- Form field change ----- */
  const change = (name: string, value: any) =>
    setForm((prev: any) => ({ ...prev, [name]: value }))

  /* ----- Submit ----- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload: any = { ...form }

      // Convert CSV strings to arrays where needed
      if (payload.services) payload.services = arrayFromCSV(payload.services)
      if (payload.tools) payload.tools = arrayFromCSV(payload.tools)

      const snakePayload = toSnakeCase(payload)

      if (editingId) {
        const { error } = await supabase
          .from(tabConfig.table)
          .update(snakePayload)
          .eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from(tabConfig.table).insert(snakePayload)
        if (error) throw error
      }

      setModalOpen(false)
      await fetchItems()
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  /* ----- Delete ----- */
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this item?')) return
    const { error } = await supabase.from(tabConfig.table).delete().eq('id', id)
    if (error) setError(error.message)
    else await fetchItems()
  }

  /* ----- Edit ----- */
  const handleEdit = (item: any) => {
    setEditingId(item.id)
    setForm(item)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingId(null)
    setForm(initialFormFor(activeTab))
    setModalOpen(true)
  }

  /* ----- File validation ----- */
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only JPEG, PNG, WebP, and GIF images are allowed.'
    }
    if (file.size > MAX_SIZE_BYTES) {
      return 'File must be under 5 MB.'
    }
    return null
  }

  /* ----- Get the image field name for the active tab ----- */
  const getImageField = (): string => {
    if (activeTab === 'caseStudies') return 'media_url'
    if (activeTab === 'graphicDesigns') return 'image_url'
    if (activeTab === 'ugcVideos') return 'thumbnail_url'
    return 'media_url'
  }

  /* ----- File input ----- */
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      e.target.value = ''
      return
    }
    try {
      const url = await uploadFile(file)
      change(field, url)
    } catch (err: any) {
      setError(err.message)
    }
    e.target.value = ''
  }

  /* ------------------------------------------------------------------ */
/* Dynamic form renderer                                            */
/* ------------------------------------------------------------------ */

  const renderCommonFields = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.title ?? ''}
            onChange={(e) => change('title', e.target.value)}
          />
        </div>
        {activeTab !== 'gallery' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={form.category ?? ''}
              onChange={(e) => change('category', e.target.value)}
            />
          </div>
        )}
        {activeTab !== 'gallery' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={form.date ?? ''}
              onChange={(e) => change('date', e.target.value)}
            />
          </div>
        )}
        {activeTab !== 'gallery' && (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2"
              checked={!!form.is_featured}
              onChange={(e) => change('is_featured', e.target.checked)}
            />
            <label className="text-sm text-gray-700">Featured</label>
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={3}
          value={form.description ?? form.summary ?? ''}
          onChange={(e) =>
            activeTab === 'caseStudies'
              ? change('summary', e.target.value)
              : change('description', e.target.value)
          }
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Media URL</label>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={form.media_url ?? form.image_url ?? form.thumbnail_url ?? form.url ?? ''}
            onChange={(e) => {
              const val = e.target.value
              if (activeTab === 'caseStudies') change('media_url', val)
              else if (activeTab === 'graphicDesigns') change('image_url', val)
              else if (activeTab === 'ugcVideos') change('thumbnail_url', val)
              else change('media_url', val)
            }}
          />
          <label className="btn btn-primary px-4 cursor-pointer inline-flex items-center">
            Browse
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFile(e, getImageField())}
            />
          </label>
        </div>
      </div>
    </>
  )

  const renderTabSpecificFields = () => {
    switch (activeTab) {
      case 'caseStudies': {
        const f = form as CaseForm
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.client ?? ''}
                  onChange={(e) => change('client', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.label ?? ''}
                  onChange={(e) => change('label', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.year ?? ''}
                  onChange={(e) => change('year', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Accent</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={f.accent ?? 'sage'}
                  onChange={(e) => change('accent', e.target.value)}
                >
                  <option>sage</option>
                  <option>aqua</option>
                  <option>ink</option>
                  <option>sand</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={f.result ?? ''}
                onChange={(e) => change('result', e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Impact Label</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={f.impact_label ?? ''}
                onChange={(e) => change('impact_label', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Situation</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={2}
                  value={f.situation ?? ''}
                  onChange={(e) => change('situation', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={2}
                  value={f.task ?? ''}
                  onChange={(e) => change('task', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={2}
                  value={f.action ?? ''}
                  onChange={(e) => change('action', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Results</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows={2}
                  value={f.results ?? ''}
                  onChange={(e) => change('results', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drive URL</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.drive_url ?? ''}
                  onChange={(e) => change('drive_url', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media Kind</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={f.media_kind ?? 'image'}
                  onChange={(e) => change('media_kind', e.target.value)}
                >
                  <option>image</option>
                  <option>video</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Services (comma separated)</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={Array.isArray(f.services) ? f.services.join(', ') : ''}
                onChange={(e) => change('services', e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tools (comma separated)</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={Array.isArray(f.tools) ? f.tools.join(', ') : ''}
                onChange={(e) => change('tools', e.target.value)}
              />
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
                checked={!!f.is_concept}
                onChange={(e) => change('is_concept', e.target.checked)}
              />
              <label className="text-sm text-gray-700">Is Concept</label>
            </div>
          </>
        )
      }
      case 'projects': {
        const f = form as ProjectForm
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.role ?? ''}
                  onChange={(e) => change('role', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.project_url ?? ''}
                  onChange={(e) => change('project_url', e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tools (comma separated)</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={Array.isArray(f.tools) ? f.tools.join(', ') : ''}
                onChange={(e) => change('tools', e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Kind</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={f.media_kind ?? 'image'}
                onChange={(e) => change('media_kind', e.target.value)}
              >
                <option>image</option>
                <option>video</option>
              </select>
            </div>
          </>
        )
      }
      case 'ugcVideos': {
        const f = form as UGCForm
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.platform ?? ''}
                  onChange={(e) => change('platform', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={f.video_url ?? ''}
                  onChange={(e) => change('video_url', e.target.value)}
                />
              </div>
            </div>
          </>
        )
      }
      case 'gallery': {
        const f = form as GalleryItem
        return (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kind</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={f.kind ?? 'image'}
                onChange={(e) => change('kind', e.target.value)}
              >
                <option>image</option>
                <option>video</option>
              </select>
            </div>
          </>
        )
      }
      default:
        return null
    }
  }

  /* ------------------------------------------------------------------ */
/* UI                                                                 */
/* ------------------------------------------------------------------ */

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <p className="text-gray-600">Manage case studies, projects, designs, UGC, and gallery items.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded text-sm">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 mb-2 border-b-2 text-sm font-medium transition ${
              activeTab === t.key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">{tabConfig.label}</h2>
          <button
            onClick={handleAdd}
            className="btn btn-primary px-4 py-2 text-sm"
          >
            + Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b">
                <th className="pb-2">Title</th>
                <th className="pb-2">Category</th>
                <th className="pb-2">Date</th>
                <th className="pb-2 text-center">Featured</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm">{item.title}</td>
                  <td className="py-3 text-xs text-gray-600">{item.category ?? '-'}</td>
                  <td className="py-3 text-xs text-gray-600">{item.date ?? '-'}</td>
                  <td className="py-3 text-center">
                    {item.is_featured ? (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.724c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:underline text-sm mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No items yet. Add one above.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={5} className="py-4 text-center">
                    Loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {editingId ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {renderCommonFields()}
              {renderTabSpecificFields()}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline px-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary px-6"
                  disabled={loading}
                >
                  {loading ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}