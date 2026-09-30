import { lazy, Suspense, useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import JoinClass from './pages/JoinClass.jsx'

const ScrollSolvingCube = lazy(() => import('./components/ScrollSolvingCube.jsx'))

function getIsJoinClassRoute() {
    const path = window.location.pathname.toLowerCase()
    const hash = window.location.hash.toLowerCase()
    return (
        path.includes('/join-class') ||
        path.includes('/join') ||
        hash === '#join-class' ||
        hash === '#join'
    )
}

export default function App() {
    const [isJoinClass, setIsJoinClass] = useState(getIsJoinClassRoute)

    useEffect(() => {
        const handleLocationChange = () => {
            setIsJoinClass(getIsJoinClassRoute())
        }

        window.addEventListener('popstate', handleLocationChange)
        window.addEventListener('hashchange', handleLocationChange)

        return () => {
            window.removeEventListener('popstate', handleLocationChange)
            window.removeEventListener('hashchange', handleLocationChange)
        }
    }, [])

    const navigate = (to) => {
        if (to === '/join-class' || to === '/join' || to === '#join-class') {
            window.history.pushState({}, '', '/join-class')
            setIsJoinClass(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            window.history.pushState({}, '', '/')
            setIsJoinClass(false)
            if (to && to.startsWith('#')) {
                const el = document.querySelector(to)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    return (
        <>
            <Suspense fallback={null}>
                <ScrollSolvingCube />
            </Suspense>
            <div className="relative z-[1]">
                {isJoinClass ? (
                    <JoinClass onNavigate={navigate} />
                ) : (
                    <Home onNavigate={navigate} />
                )}
            </div>
        </>
    )
}
