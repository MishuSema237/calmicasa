'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Star, Zap, Shield, Crown } from 'lucide-react'

export default function MembershipPage() {
    const tiers = [
        {
            name: 'Starter',
            price: '$9',
            period: '/month',
            description: 'Perfect for those just starting their tiny home journey.',
            icon: Star,
            features: [
                'Access to community forums',
                'Basic downloadable guides',
                'Monthly newsletter',
                'Member-only blog posts'
            ],
            buttonText: 'Get Started',
            popular: false,
            color: 'blue'
        },
        {
            name: 'Builder',
            price: '$29',
            period: '/month',
            description: 'For active builders looking for resources and support.',
            icon: Zap,
            features: [
                'Everything in Starter',
                'Access to floor plan library',
                'Discounts on materials',
                'Priority support',
                'Weekly Q&A sessions'
            ],
            buttonText: 'Join Now',
            popular: true,
            color: 'green'
        },
        {
            name: 'Pro',
            price: '$49',
            period: '/month',
            description: 'Connect with clients and showcase your work.',
            icon: Crown,
            features: [
                'Everything in Builder',
                'Featured profile in directory',
                'Unlimited potential client leads',
                'Vetted builder full badge',
                '1-on-1 business consulting'
            ],
            buttonText: 'Go Pro',
            popular: false,
            color: 'purple'
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="py-20 px-4 text-center bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Choose Your <span className="text-blue-600">Membership</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Unlock exclusive resources, community access, and tools to accelerate your tiny home project.
                    </p>
                </motion.div>
            </section>

            {/* Pricing Tables */}
            <section className="pb-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => {
                        const Icon = tier.icon
                        return (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative bg-white rounded-2xl shadow-xl p-8 border-2 ${tier.popular ? 'border-blue-500 scale-105 z-10' : 'border-transparent'
                                    }`}
                            >
                                {tier.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-lg bg-${tier.color}-100 flex items-center justify-center mb-6`}>
                                    <Icon className={`w-6 h-6 text-${tier.color}-600`} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <div className="flex items-baseline mb-4">
                                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                                    <span className="text-gray-500 ml-1">{tier.period}</span>
                                </div>
                                <p className="text-gray-600 mb-8">{tier.description}</p>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-gray-600 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${tier.popular
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}>
                                    {tier.buttonText}
                                </button>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* FAQ Section simplified */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Questions?</h2>
                    <p className="text-gray-600 mb-8">
                        Not sure which plan is right for you? Contact our support team for help.
                    </p>
                    <Link href="/help/contact" className="text-blue-600 font-semibold hover:underline">
                        Contact Support &rarr;
                    </Link>
                </div>
            </section>
        </div>
    )
}
