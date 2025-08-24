'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Target, Users, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ExchangeRates {
  USD: number
  ZAR: number
  GBP: number
}

export default function BudgetSection() {
  const [rates, setRates] = useState<ExchangeRates>({
    USD: 1,
    ZAR: 18.5,
    GBP: 0.79
  })
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'ZAR' | 'GBP'>('USD')
  const [amount, setAmount] = useState(1)

  // Fetch live exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        const data = await response.json()
        setRates({
          USD: 1,
          ZAR: data.rates.ZAR,
          GBP: data.rates.GBP
        })
      } catch (error) {
        console.log('Using fallback rates')
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const convertCurrency = (amount: number, from: 'USD' | 'ZAR' | 'GBP', to: 'USD' | 'ZAR' | 'GBP') => {
    const usdAmount = amount / rates[from]
    return Math.round(usdAmount * rates[to])
  }

  const budgetRanges = [
    {
      range: '$270 - $540',
      zar: 'R4 999 - R9 999',
      gbp: '£210 - £420',
      description: 'Basic web development and digital marketing solutions'
    },
    {
      range: '$540 - $1,080',
      zar: 'R10 000 - R19 999',
      gbp: '£420 - £840',
      description: 'Comprehensive digital solutions with advanced features'
    },
    {
      range: '$1,080+',
      zar: 'R20 000+',
      gbp: '£840+',
      description: 'Premium solutions with custom development and advanced marketing'
    }
  ]

  const features = [
    {
      icon: Target,
      title: 'Business Understanding',
      description: 'We dive deep into your business model, market position, and competitive landscape to create strategies that align with your unique goals.'
    },
    {
      icon: Users,
      title: 'Target Market Analysis',
      description: 'Comprehensive research of your target audience, their behaviors, preferences, and pain points to ensure maximum engagement and conversion.'
    },
    {
      icon: Lightbulb,
      title: 'Vision Alignment',
      description: 'We align our solutions with your long-term vision, ensuring every digital asset contributes to your business growth and success.'
    },
    {
      icon: TrendingUp,
      title: 'ROI Focused',
      description: 'Every investment is designed to deliver measurable returns, from increased traffic and conversions to improved brand recognition and customer loyalty.'
    }
  ]

  return (
    <section className="section-padding bg-primary-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="heading-lg mb-4 sm:mb-6">What&apos;s Your Budget?</h2>
          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <p className="text-body text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              We believe that every website, marketing campaign, and digital solution is an investment in your business&apos;s future. 
              That&apos;s why we ensure that every investment you make through us brings not just happiness and satisfaction, 
              but measurable ROI, increased market share, enhanced brand recognition, and sustainable business growth.
            </p>
                          <p className="text-body text-gray-600 leading-relaxed">
                Before we create your perfect solution, we first understand your business, your market dynamics, 
                your target audience, and your vision. This deep understanding allows us to bring the best strategies, 
                technologies, and creative solutions that will drive your business forward and exceed your expectations.
                Whether you&apos;re a Johannesburg-based startup, an established business in South Africa, or an international 
                company looking for global digital solutions across Africa and beyond, we tailor our services to your specific market while 
                maintaining world-class standards.
              </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-4 sm:p-6 mobile-card hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-gray-800 transition-colors duration-300"
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-white group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-primary-black">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Currency Converter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 md:mb-16 shadow-lg"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-primary-black">Live Currency Converter</h3>
            <p className="text-gray-600 text-sm sm:text-base">Convert between USD, ZAR, and GBP</p>
          </div>
          
          {/* Desktop/Tablet Layout */}
          <div className="hidden md:flex items-center justify-center space-x-8 lg:space-x-12">
            {/* Input Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-32 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-black focus:border-transparent text-lg font-medium text-center bg-white shadow-sm"
                  placeholder="Enter amount"
                />
              </div>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as 'USD' | 'ZAR' | 'GBP')}
                className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-black focus:border-transparent text-lg font-medium bg-white shadow-sm cursor-pointer hover:border-gray-400 transition-colors"
              >
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            
            {/* Arrow */}
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>
            
            {/* Conversion Results */}
            <div className="flex space-x-6 lg:space-x-8">
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[120px]">
                <div className="text-2xl font-bold text-primary-black mb-1">
                  ${convertCurrency(amount, selectedCurrency, 'USD').toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 font-medium">USD</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[120px]">
                <div className="text-2xl font-bold text-primary-black mb-1">
                  R{convertCurrency(amount, selectedCurrency, 'ZAR').toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 font-medium">ZAR</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[120px]">
                <div className="text-2xl font-bold text-primary-black mb-1">
                  £{convertCurrency(amount, selectedCurrency, 'GBP').toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 font-medium">GBP</div>
              </div>
            </div>
          </div>

          {/* Mobile Layout (unchanged) */}
          <div className="md:hidden flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            {/* Input and Currency Selector */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-xs sm:max-w-none">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full sm:w-32 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-black focus:border-transparent text-sm sm:text-base text-center sm:text-left"
                placeholder="Enter amount"
              />
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as 'USD' | 'ZAR' | 'GBP')}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-black focus:border-transparent text-sm sm:text-base text-center sm:text-left"
              >
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            
            {/* Separator */}
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            
            {/* Conversion Results */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm sm:text-base font-semibold text-primary-black">
                  ${convertCurrency(amount, selectedCurrency, 'USD').toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">USD</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm sm:text-base font-semibold text-primary-black">
                  R{convertCurrency(amount, selectedCurrency, 'ZAR').toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">ZAR</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="text-sm sm:text-base font-semibold text-primary-black">
                  £{convertCurrency(amount, selectedCurrency, 'GBP').toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">GBP</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Budget Ranges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {budgetRanges.map((budget, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 text-center hover:border-primary-black hover:shadow-2xl transition-all duration-300 mobile-card relative overflow-hidden group"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-black to-gray-800 origin-left"
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary-black group-hover:text-gray-800 transition-colors duration-300">{budget.range}</h3>
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  <div className="text-sm sm:text-base text-gray-600 font-medium">ZAR: {budget.zar}</div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">GBP: {budget.gbp}</div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{budget.description}</p>
                <div className="mt-4 sm:mt-6">
                  <Link href="/services" className="inline-flex items-center text-primary-black hover:text-gray-700 font-medium text-sm transition-colors duration-200">
                    Learn more about our services
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 