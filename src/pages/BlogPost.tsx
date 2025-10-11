import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Eye, 
  Clock, 
  Tag, 
  Share2, 
  Heart,
  MessageCircle,
  ArrowRight,
  Edit,
  BookOpen,
  Send
} from 'lucide-react'
import { db } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

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

interface BlogComment {
  id: string
  post_id: string
  parent_id?: string
  author_name: string
  author_email: string
  author_website?: string
  content: string
  status: string
  created_at: string
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<BlogComment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    author_website: '',
    content: ''
  })
  const [submittingComment, setSubmittingComment] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [isRelatedPostModalOpen, setIsRelatedPostModalOpen] = useState(false)
  const [selectedRelatedPost, setSelectedRelatedPost] = useState<BlogPost | null>(null)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false)
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info'
    title: string
    message: string
    show: boolean
  }>({
    type: 'info',
    title: '',
    message: '',
    show: false
  })

  useEffect(() => {
    if (slug) {
      loadPost()
    }
  }, [slug])

  const loadPost = async () => {
    try {
      setLoading(true)
      
      if (!slug) {
        console.error('No slug provided')
        navigate('/blog')
        return
      }
      
      // Load the blog post
      const postData = await db.getBlogPostBySlug(slug)
      
      if (!postData) {
        console.error('Blog post not found')
        navigate('/blog')
        return
      }
      
      if (postData.status !== 'published') {
        console.warn('Blog post is not published')
        navigate('/blog')
        return
      }
      
      setPost(postData)
      
      // Track view (don't block page load if this fails)
      try {
        await db.incrementBlogView(postData.id, {
          user_agent: navigator.userAgent,
          referrer: document.referrer
        })
      } catch (viewError) {
        console.warn('Failed to track view:', viewError)
        // Don't block page load if view tracking fails
      }
      
      // Load related posts
      const relatedData = await db.getBlogPosts({
        status: 'published',
        category_id: postData.category_id,
        limit: 3
      })
      
      // Filter out current post and get first 3
      const filteredRelated = (relatedData || [])
        .filter(p => p.id !== postData.id)
        .slice(0, 3)
      
      setRelatedPosts(filteredRelated)
      
      // Load comments
      const commentsData = await db.getBlogComments(postData.id)
      setComments(commentsData || [])
      
    } catch (error) {
      console.error('Error loading blog post:', error)
      navigate('/blog')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.subtitle,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        showNotification('success', 'Link Copied!', 'Article link has been copied to your clipboard.')
      } catch (error) {
        showNotification('error', 'Copy Failed', 'Unable to copy link to clipboard. Please try again.')
      }
    }
  }

  const handleRelatedPostClick = (relatedPost: BlogPost) => {
    setSelectedRelatedPost(relatedPost)
    setIsRelatedPostModalOpen(true)
  }

  const showNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setNotification({
      type,
      title,
      message,
      show: true
    })
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 5000)
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Comment form submitted:', commentForm)
    
    if (!post) {
      console.error('No post available for comment submission')
      return
    }

    setSubmittingComment(true)

    try {
      console.log('Creating comment for post:', post.id)
      const commentData = {
        post_id: post.id,
        author_name: commentForm.author_name,
        author_email: commentForm.author_email,
        author_website: commentForm.author_website || undefined,
        content: commentForm.content
      }
      console.log('Comment data:', commentData)
      
      await db.createBlogComment(commentData)
      console.log('Comment created successfully')

      // Reload comments
      const commentsData = await db.getBlogComments(post.id)
      console.log('Reloaded comments:', commentsData)
      setComments(commentsData || [])

      showNotification('success', 'Comment Submitted!', 'Thank you for your comment! It will be reviewed before being published.')
      setIsCommentModalOpen(false)
      setCommentForm({
        author_name: '',
        author_email: '',
        author_website: '',
        content: ''
      })
    } catch (error) {
      console.error('Error submitting comment:', error)
      showNotification('error', 'Submission Failed', `Failed to submit comment: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSubmittingComment(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatReadingTime = (minutes?: number) => {
    return minutes ? `${minutes} min read` : '5 min read'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header with Back Button */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 rounded-xl px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Blog</span>
            </Button>

            <div className="flex items-center gap-3">
              {/* Preview Button */}
              <Dialog open={isContentModalOpen} onOpenChange={setIsContentModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl px-4 py-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">Preview</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <Eye className="w-6 h-6 text-blue-500" />
                      Article Preview
                    </DialogTitle>
                  </DialogHeader>
                  <div className="prose prose-lg md:prose-xl max-w-none">
                    {post?.content && (
                      <div 
                        className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Share Button */}
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center gap-2 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-xl px-4 py-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
      {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {post.category && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex justify-center mb-6"
              >
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: post.category.color, 
                    color: post.category.color,
                    backgroundColor: `${post.category.color}10`
                  }}
                  className="gap-2 px-4 py-2 text-sm font-medium rounded-full border-2 hover:scale-105 transition-transform duration-200"
                >
                  <Tag className="w-4 h-4" />
                  {post.category.name}
                </Badge>
              </motion.div>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight"
            >
                {post.title}
            </motion.h1>
            
            {post.subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
              >
                {post.subtitle}
              </motion.p>
            )}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-500"
            >
              <Dialog open={isAuthorModalOpen} onOpenChange={setIsAuthorModalOpen}>
                <DialogTrigger asChild>
                  <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50 cursor-pointer hover:bg-white/80 transition-all duration-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{post.author_name}</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <User className="w-6 h-6 text-blue-500" />
                      Author Information
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{post.author_name}</h3>
                        <p className="text-gray-600">Content Creator</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-700">
                        This article was written by {post.author_name}, a passionate content creator 
                        who specializes in web development and technology. With expertise in modern 
                        web technologies and best practices, {post.author_name} brings valuable 
                        insights to help developers stay ahead of the curve.
                      </p>
                  </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{formatDate(post.published_at || post.created_at)}</span>
                  </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="font-medium">{formatReadingTime(post.reading_time)}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50">
                <Eye className="w-5 h-5 text-purple-500" />
                <span className="font-medium">{post.view_count} views</span>
              </div>
            </motion.div>
          </motion.div>

      {/* Featured Image */}
      {post.featured_image_url && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16 relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20"></div>
              </motion.div>
      )}

      {/* Article Content */}
                <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200/50 shadow-xl">
              {post.content ? (
                <div 
                  className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-green-500 prose-blockquote:bg-green-50 prose-blockquote:rounded-r-lg prose-blockquote:p-4 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:mb-2 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                  <div className="text-gray-600 text-lg">Content is being loaded...</div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-16"
            >
              <Dialog open={isTagsModalOpen} onOpenChange={setIsTagsModalOpen}>
                <DialogTrigger asChild>
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200/50 cursor-pointer hover:shadow-lg transition-all duration-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-green-500" />
                      Tags ({post.tags.length})
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 border border-green-200 rounded-full"
                        >
                          #{tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge 
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-300 rounded-full"
                        >
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <Tag className="w-6 h-6 text-green-500" />
                      Article Tags
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      This article is tagged with the following topics. Click on any tag to explore related content.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 border border-green-200 hover:from-green-100 hover:to-blue-100 hover:scale-105 transition-all duration-200 rounded-full cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600">
                        Tags help categorize content and make it easier to find related articles. 
                        Use these tags to discover more content on similar topics.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          )}

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-gray-200/50">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                Comments ({comments.length})
              </h3>
              
              {/* Comment Form Modal Trigger */}
              <div className="mb-8 flex justify-center">
                <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                      <Edit className="w-5 h-5 mr-2" />
                      Leave a Comment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Edit className="w-6 h-6 text-green-500" />
                        Leave a Comment
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="author_name"
                        value={commentForm.author_name}
                        onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="author_email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="author_email"
                        value={commentForm.author_email}
                        onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="author_website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      id="author_website"
                      value={commentForm.author_website}
                      onChange={(e) => setCommentForm({ ...commentForm, author_website: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Comment *
                    </label>
                    <textarea
                      id="content"
                      value={commentForm.content}
                      onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
                      placeholder="Share your thoughts..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submittingComment}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submittingComment ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit Comment
                      </div>
                    )}
                  </Button>
                </form>
                  </DialogContent>
                </Dialog>
              </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="font-bold text-gray-900 text-lg">{comment.author_name}</h5>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(comment.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {comments.length === 0 && (
                <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
          </motion.div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-200/50"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card 
                    key={relatedPost.id} 
                    className="hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-white/80 backdrop-blur-sm border-0 overflow-hidden"
                    onClick={() => handleRelatedPostClick(relatedPost)}
                  >
                    <CardContent className="p-0">
                      {relatedPost.featured_image_url && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={relatedPost.featured_image_url}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2 text-lg leading-tight">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(relatedPost.published_at || relatedPost.created_at)}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-green-700 group-hover:text-white group-hover:border-transparent transition-all duration-200 rounded-xl font-medium"
                        >
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
            </div>
          </div>

      {/* Related Post Modal */}
      <Dialog open={isRelatedPostModalOpen} onOpenChange={setIsRelatedPostModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRelatedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-green-500" />
                  {selectedRelatedPost.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {selectedRelatedPost.featured_image_url && (
                  <div className="relative h-64 overflow-hidden rounded-xl">
                    <img
                      src={selectedRelatedPost.featured_image_url}
                      alt={selectedRelatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="prose prose-lg max-w-none">
                  {selectedRelatedPost.excerpt && (
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {selectedRelatedPost.excerpt}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={() => navigate(`/blog/${selectedRelatedPost.slug}`)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-medium"
                  >
                    Read Full Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsRelatedPostModalOpen(false)}
                    className="px-6 py-3 rounded-xl"
                  >
                    Close
                  </Button>
          </div>
        </div>
            </>
          )}
        </DialogContent>
      </Dialog>


      {/* Notification Modal */}
      <Dialog open={notification.show} onOpenChange={(open) => setNotification(prev => ({ ...prev, show: open }))}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className={`text-xl font-bold flex items-center gap-3 ${
              notification.type === 'success' ? 'text-green-600' :
              notification.type === 'error' ? 'text-red-600' : 'text-blue-600'
            }`}>
              {notification.type === 'success' && <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>}
              {notification.type === 'error' && <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>}
              {notification.type === 'info' && <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>}
              {notification.title}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">{notification.message}</p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className={`px-6 py-2 rounded-xl font-medium ${
                notification.type === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
                notification.type === 'error' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}