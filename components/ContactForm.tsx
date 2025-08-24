'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  serviceType: z.enum(['web-development', 'marketing'], {
    required_error: 'Please select a service type',
  }),
  projectType: z.enum(['new-project', 'existing-project', 'enquiry'], {
    required_error: 'Please select a project type',
  }),
  budget: z.object({
    amount: z.string().optional(),
    currency: z.enum(['USD', 'ZAR', 'GBP']).optional(),
  }).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const budgetAmount = watch('budget.amount')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        console.log('Message sent successfully:', responseData)
      } else {
        setSubmitStatus('error')
        console.error('Failed to send message:', responseData)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-primary-white p-8 rounded-lg shadow-lg w-full max-w-full"
    >
      <h3 className="text-2xl font-bold text-primary-black mb-6">Send us a message</h3>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg flex items-center space-x-3"
        >
          <CheckCircle size={24} className="text-green-600" />
          <span className="text-green-800 font-medium">Message sent successfully! We&apos;ll get back to you soon.</span>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
        >
          <AlertCircle size={20} className="text-red-600" />
          <span className="text-red-800">Something went wrong. Please try again.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors ${
              errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors ${
              errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Service Type Dropdown */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            Service Type *
          </label>
          <select
            {...register('serviceType')}
            id="serviceType"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors ${
              errors.serviceType ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
            }`}
          >
            <option value="">Select a service type</option>
            <option value="web-development">Web Development</option>
            <option value="marketing">Marketing</option>
          </select>
          {errors.serviceType && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.serviceType.message}
            </motion.p>
          )}
        </div>

        {/* Project Type Dropdown */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            Project Type *
          </label>
          <select
            {...register('projectType')}
            id="projectType"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors ${
              errors.projectType ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
            }`}
          >
            <option value="">Select a project type</option>
            <option value="new-project">New Project</option>
            <option value="existing-project">Follow-up on Existing Project</option>
            <option value="enquiry">General Enquiry</option>
          </select>
          {errors.projectType && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.projectType.message}
            </motion.p>
          )}
        </div>

        {/* Budget Field (Optional) */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget (Optional)
          </label>
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                {...register('budget.amount')}
                type="number"
                id="budget"
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors ${
                  errors.budget?.amount ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
                }`}
                placeholder="Enter amount"
              />
            </div>
            <div className="w-24">
              <select
                {...register('budget.currency')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors ${
                  errors.budget?.currency ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
                }`}
              >
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
                <option value="GBP">£</option>
              </select>
            </div>
          </div>
          {errors.budget?.amount && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.budget.amount.message}
            </motion.p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-black transition-colors resize-none ${
              errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-primary-black'
            }`}
            placeholder="Tell us about your project or inquiry..."
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.message.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-primary-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send size={20} />
              <span>Send Message</span>
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
} 