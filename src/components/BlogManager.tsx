import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, Save, X, Calendar, User, Tag } from 'lucide-react'
import { db } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

interface BlogPost {
  id: string
  title: string
  slug: string
  subtitle?: string
  content: string
  excerpt?: string
  featured_image_url?: string
  category_id?: string
  author_name?: string
  author_email?: string
  author_avatar_url?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  tags?: string[]
  status: string
  is_featured: boolean
  is_pinned: boolean
  view_count: number
  like_count: number
  comment_count: number
  reading_time?: number
  published_at?: string
  created_at: string
  updated_at: string
  category?: {
    name: string
    slug: string
    color: string
    icon: string
  }
}

interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon?: string
  sort_order: number
  is_active: boolean
}

interface BlogStats {
  total_posts: number
  published_posts: number
  draft_posts: number
  total_views: number
  total_comments: number
}

export const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [stats, setStats] = useState<BlogStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    category_id: '',
    author_name: 'Lunexweb Team',
    author_email: 'team@lunexweb.com',
    author_avatar_url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    tags: '',
    status: 'draft',
    is_featured: false,
    is_pinned: false
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      console.log('Loading blog data...')

      const [postsData, categoriesData, statsData] = await Promise.all([
        db.getBlogPosts({ limit: 100 }).catch(err => {
          console.warn('Failed to load blog posts:', err)
          return []
        }),
        db.getBlogCategories().catch(err => {
          console.warn('Failed to load blog categories:', err)
          return []
        }),
        db.getBlogStats().catch(err => {
          console.warn('Failed to load blog stats:', err)
          return {
            total_posts: 0,
            published_posts: 0,
            draft_posts: 0,
            total_views: 0,
            total_comments: 0
          }
        })
      ])

      console.log('Blog data loaded:', { postsData, categoriesData, statsData })

      setPosts(postsData || [])
      setCategories(categoriesData || [])
      setStats(statsData || {
        total_posts: 0,
        published_posts: 0,
        draft_posts: 0,
        total_views: 0,
        total_comments: 0
      })
    } catch (error) {
      console.error('Error loading blog data:', error)
      toast({
        title: "Warning",
        description: "Blog tables not found. Please run the SQL setup script first.",
        variant: "destructive",
      })
      setPosts([])
      setCategories([])
      setStats({
        total_posts: 0,
        published_posts: 0,
        draft_posts: 0,
        total_views: 0,
        total_comments: 0
      })
    } finally {
      setLoading(false)
    }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const postData = {
        ...formData,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        category_id: formData.category_id || null
      }

      await db.createBlogPost(postData)
      await loadData()
      
      // Reset form
      setFormData({
        title: '',
        slug: '',
        subtitle: '',
        content: '',
        excerpt: '',
        featured_image_url: '',
        category_id: '',
        author_name: 'Lunexweb Team',
        author_email: 'team@lunexweb.com',
        author_avatar_url: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        tags: '',
        status: 'draft',
        is_featured: false,
        is_pinned: false
      })
      
      setIsCreateDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      })
    } catch (error) {
      console.error('Error creating blog post:', error)
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return

    setSubmitting(true)
    
    try {
      const updateData = {
        ...formData,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        category_id: formData.category_id || null
      }

      await db.updateBlogPost(editingPost.id, updateData)
      await loadData()
      
      setEditingPost(null)
      setIsEditDialogOpen(false)
      
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      })
    } catch (error) {
      console.error('Error updating blog post:', error)
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    try {
      await db.deleteBlogPost(postId)
      await loadData()
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      })
    } catch (error) {
      console.error('Error deleting blog post:', error)
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTogglePublished = async (post: BlogPost) => {
    try {
      const updatedPost = await db.updateBlogPost(post.id, {
        status: post.status === 'published' ? 'draft' : 'published'
      })
      setPosts(posts.map(p => p.id === post.id ? updatedPost : p))
      await loadData()
      toast({
        title: post.status === 'published' ? "Post Unpublished" : "Post Published",
        description: `The post has been ${post.status === 'published' ? 'unpublished' : 'published'} successfully.`,
      })
      } catch (error) {
      console.error('Error updating post:', error)
      toast({
        title: "Error",
        description: "Failed to update post status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      if (!post.is_featured) {
        // If we're featuring this post, first unfeature all other posts
        const currentlyFeatured = posts.filter(p => p.is_featured && p.id !== post.id)
        
        // Unfeature all currently featured posts
        for (const featuredPost of currentlyFeatured) {
          await db.updateBlogPost(featuredPost.id, {
      is_featured: false
          })
        }
      }
      
      // Update the current post's featured status
      const updatedPost = await db.updateBlogPost(post.id, {
        is_featured: !post.is_featured
      })
      
      // Update the local state
      setPosts(posts.map(p => 
        p.id === post.id 
          ? updatedPost 
          : { ...p, is_featured: false } // Unfeature all others locally
      ))
      
      await loadData()
      
      toast({
        title: post.is_featured ? "Post Unfeatured" : "Post Featured",
        description: post.is_featured 
          ? "The post has been unfeatured successfully." 
          : "The post has been featured successfully. All other posts have been unfeatured.",
      })
    } catch (error) {
      console.error('Error updating post:', error)
      toast({
        title: "Error",
        description: "Failed to update post feature status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      slug: post.slug,
      subtitle: post.subtitle || '',
      content: post.content,
      excerpt: post.excerpt || '',
      featured_image_url: post.featured_image_url || '',
      category_id: post.category_id || '',
      author_name: post.author_name || 'Lunexweb Team',
      author_email: post.author_email || 'team@lunexweb.com',
      author_avatar_url: post.author_avatar_url || '',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords?.join(', ') || '',
      tags: post.tags?.join(', ') || '',
      status: post.status,
      is_featured: post.is_featured,
      is_pinned: post.is_pinned
    })
    setIsEditDialogOpen(true)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || post.category_id === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
              Add Blog Post
          </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Add a new blog post to your website. Fill in the details below to create engaging content.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
                    }}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Brief subtitle or description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short excerpt for preview"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featured_image_url">Featured Image URL</Label>
                <Input
                  id="featured_image_url"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Category</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author_name">Author Name</Label>
                  <Input
                    id="author_name"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author_email">Author Email</Label>
                  <Input
                    id="author_email"
                    type="email"
                    value={formData.author_email}
                    onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                    placeholder="author@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                  id="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="SEO meta description"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: !!checked })}
                  />
                  <Label htmlFor="is_featured">Featured Post</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_pinned"
                    checked={formData.is_pinned}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_pinned: !!checked })}
                  />
                  <Label htmlFor="is_pinned">Pinned Post</Label>
        </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700">
                  {submitting ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_posts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.published_posts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.draft_posts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.total_views}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.total_comments}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

      {/* Posts List */}
      <div className="grid gap-6">
            {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Post Image */}
                {post.featured_image_url && (
                  <div className="lg:w-48 flex-shrink-0">
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Post Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    {post.is_featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                    )}
                      {post.is_pinned && (
                        <Badge className="bg-blue-100 text-blue-800">Pinned</Badge>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(post.status)} w-fit`}>
                      {post.status}
                    </Badge>
                  </div>

                  {post.subtitle && (
                    <p className="text-gray-600 text-sm">{post.subtitle}</p>
                  )}

                  {post.category && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <Badge variant="outline" style={{ borderColor: post.category.color, color: post.category.color }}>
                        {post.category.name}
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.created_at)}
                  </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.view_count} views
                  </div>
                </div>
                
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublished(post)}
                  >
                    {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {post.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(post)}
                  >
                    {post.is_featured ? 'Unfeature' : 'Feature'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                        Delete
                  </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{post.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                    onClick={() => handleDeletePost(post.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
            ))}
          </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first blog post'
            }
          </p>
          {(!searchQuery && statusFilter === 'all' && categoryFilter === 'all') && (
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Post
                </Button>
          )}
              </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update the blog post details below. All changes will be saved to your blog.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title *</Label>
                    <Input
                  id="edit-title"
                      value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
                  }}
                  placeholder="Enter blog post title"
                  required
                    />
                  </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug *</Label>
                    <Input
                  id="edit-slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                  required
                    />
                  </div>
                </div>

            <div className="space-y-2">
              <Label htmlFor="edit-subtitle">Subtitle</Label>
              <Input
                id="edit-subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Brief subtitle or description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-excerpt">Excerpt</Label>
                  <Textarea
                id="edit-excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short excerpt for preview"
                    rows={3}
                  />
                </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content">Content *</Label>
                  <Textarea
                id="edit-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog post content here..."
                    rows={10}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-featured_image_url">Featured Image URL</Label>
              <Input
                id="edit-featured_image_url"
                value={formData.featured_image_url}
                onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                  />
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                    <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                    <SelectItem value="">No Category</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="edit-author_name">Author Name</Label>
                <Input
                  id="edit-author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-author_email">Author Email</Label>
                <Input
                  id="edit-author_email"
                  type="email"
                  value={formData.author_email}
                  onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                  placeholder="author@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-meta_keywords">Meta Keywords</Label>
                  <Input
                id="edit-meta_keywords"
                value={formData.meta_keywords}
                onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-meta_description">Meta Description</Label>
              <Textarea
                id="edit-meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="SEO meta description"
                rows={3}
                  />
                </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: !!checked })}
                />
                <Label htmlFor="edit-is_featured">Featured Post</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-is_pinned"
                  checked={formData.is_pinned}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_pinned: !!checked })}
                />
                <Label htmlFor="edit-is_pinned">Pinned Post</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
              <Button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700">
                {submitting ? 'Updating...' : 'Update Post'}
              </Button>
                </div>
          </form>
        </DialogContent>
      </Dialog>
              </div>
  )
}