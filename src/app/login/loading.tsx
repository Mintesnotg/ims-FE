'use client'
 
import { useLinkStatus } from 'next/link'
 
export default function LoadingIndicator() {
  const { pending } = useLinkStatus()

      function delay() {

        setTimeout(() => {
            alert('Sent...')
        }, 4000);
    }
    delay()
  return pending ? (
    <div role="status" aria-label="Loading" className="spinner" />
  ) : null
}
