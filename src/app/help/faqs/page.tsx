'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function FAQsPage() {
    const faqs = [
        {
            question: 'Do I need a permit for a tiny home?',
            answer: 'It depends on your location and whether your tiny home is on wheels (THOW) or a foundation. Typically, THOWs are classified as RVs, while foundation homes need standard building permits. We recommend consulting our Legal resources or booking an expert consultation.'
        },
        {
            question: 'Can I finance a tiny home?',
            answer: 'Yes! While traditional mortgages might not apply, many lenders offer RV loans or personal loans specifically for tiny homes. We also offer financing partners for our certified builds.'
        },
        {
            question: 'How are tiny homes heated and cooled?',
            answer: 'Most tiny homes use mini-split systems which provide highly efficient heating and cooling. Wood stoves and propane heaters are also popular backup options for off-grid builds.'
        },
        {
            question: 'Can I customize a standard model?',
            answer: 'Absolutely. All our models can be customized with different materials, finishes, and layout tweaks. Use our 3D Designer tool to visualize your changes or speak with our design team.'
        },
        {
            question: 'What is the delivery timeline?',
            answer: 'For standard models, the lead time is typically 12-16 weeks. Custom builds may take 4-6 months depending on complexity and material availability.'
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-white">
            <section className="py-20 px-4 max-w-3xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600">
                        Common questions about tiny living, construction, and our services.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <Accordion key={idx} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </section>
        </div>
    )
}

function Accordion({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-lg text-gray-900">{question}</span>
                {isOpen ? <Minus className="w-5 h-5 text-gray-500" /> : <Plus className="w-5 h-5 text-gray-500" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50"
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
