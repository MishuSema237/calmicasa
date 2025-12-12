'use client'

import { useState, useEffect } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if modal has been shown before (using localStorage)
    const hasShownBefore = localStorage.getItem('calmicas-modal-shown')
    
    if (!hasShownBefore) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
        setHasShown(true)
        localStorage.setItem('calmicas-modal-shown', 'true')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return {
    isOpen,
    openModal,
    closeModal
  }
}


