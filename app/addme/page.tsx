'use client'
import { useState, useEffect } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form state for new project
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    tech_stack: '',
    live_url: '',
    github_url: '',
    image_url: '',
    category: 'saas',
    featured: false,
    order_index: 0
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '2026') {
      setIsAuthed(true)
      fetchProjects()
    } else {
      alert('Wrong password')
    }
  }

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const res = await fetch(`${url}/rest/v1/projects_addus?select=*&order=order_index`, {
        headers: { apikey: key!, Authorization: `Bearer ${key}` }
      })
      const data = await res.json()
      setProjects(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      const projectData = {
        ...newProject,
        tech_stack: newProject.tech_stack.split(',').map(s => s.trim()).filter(Boolean)
      }

      const res = await fetch(`${url}/rest/v1/projects_addus`, {
        method: 'POST',
        headers: {
          apikey: key!,
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(projectData)
      })

      if (res.ok) {
        setNewProject({
          name: '',
          description: '',
          tech_stack: '',
          live_url: '',
          github_url: '',
          image_url: '',
          category: 'saas',
          featured: false,
          order_index: projects.length + 1
        })
        fetchProjects()
      } else {
        const err = await res.text()
        setError(`Failed to add: ${err}`)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      await fetch(`${url}/rest/v1/projects_addus?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          apikey: key!,
          Authorization: `Bearer ${key}`
        }
      })
      fetchProjects()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: 20 }}>
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h1 className="font-clash" style={{ color: 'var(--text-primary)', textAlign: 'center' }}>Admin Access</h1>
          <input 
            type="password" 
            placeholder="Password" 
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          <MagneticButton type="submit" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>Enter →</MagneticButton>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '120px 40px', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <h1 className="font-clash" style={{ fontSize: 32 }}>Project Manager</h1>
          <button onClick={() => setIsAuthed(false)} style={{ color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          {/* Left: Project List */}
          <div>
            <h2 className="font-clash" style={{ fontSize: 20, marginBottom: 24, opacity: 0.6 }}>Current Projects</h2>
            {loading && projects.length === 0 ? <p>Loading...</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {projects.map(p => (
                  <div key={p.id} style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 12, border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: 16, marginBottom: 4 }}>{p.name}</h3>
                      <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.category} • {p.tech_stack.join(', ')}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      style={{ color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {projects.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>No projects found in database.</p>}
              </div>
            )}
          </div>

          {/* Right: Add Form */}
          <div>
            <h2 className="font-clash" style={{ fontSize: 20, marginBottom: 24, opacity: 0.6 }}>Add New Project</h2>
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input 
                className="form-input" 
                placeholder="Project Name" 
                value={newProject.name} 
                onChange={e => setNewProject({...newProject, name: e.target.value})} 
                required 
              />
              <textarea 
                className="form-input" 
                placeholder="Description" 
                rows={3} 
                value={newProject.description} 
                onChange={e => setNewProject({...newProject, description: e.target.value})} 
                required 
              />
              <input 
                className="form-input" 
                placeholder="Tech Stack (comma separated)" 
                value={newProject.tech_stack} 
                onChange={e => setNewProject({...newProject, tech_stack: e.target.value})} 
                required 
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input 
                  className="form-input" 
                  placeholder="Live URL" 
                  value={newProject.live_url} 
                  onChange={e => setNewProject({...newProject, live_url: e.target.value})} 
                />
                <input 
                  className="form-input" 
                  placeholder="GitHub URL" 
                  value={newProject.github_url} 
                  onChange={e => setNewProject({...newProject, github_url: e.target.value})} 
                />
              </div>
              <input 
                className="form-input" 
                placeholder="Image URL (optional)" 
                value={newProject.image_url} 
                onChange={e => setNewProject({...newProject, image_url: e.target.value})} 
              />
              <select 
                className="form-input" 
                value={newProject.category} 
                onChange={e => setNewProject({...newProject, category: e.target.value})}
                style={{ appearance: 'none' }}
              >
                <option value="saas">SaaS</option>
                <option value="ai-tools">AI Tools</option>
                <option value="automation">Automation</option>
              </select>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="checkbox" 
                  checked={newProject.featured} 
                  onChange={e => setNewProject({...newProject, featured: e.target.checked})} 
                />
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Featured project</span>
              </div>

              {error && <p style={{ color: '#ff4444', fontSize: 12 }}>{error}</p>}
              
              <MagneticButton type="submit" variant="primary" style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Adding...' : 'Add Project →'}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
