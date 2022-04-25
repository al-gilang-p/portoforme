import { useState, useEffect, useRef } from "react"
import Footer from "./Footer"
import Header from "./Header"
import Navbar from "./Navbar"
import { motion } from "framer-motion"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [darkMode, setDarkMode] = useState(false)
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        localStorage.dark = darkMode.toString()
    }, [darkMode])

    useEffect(() => {
        if (process.browser) {
            if (
                localStorage.dark === "true" ||
                (!("dark" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
                setDarkMode(true)
            }
        }
    }, [])

    const changeMode = () => {
        return setDarkMode(!darkMode)
    }

    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col justify-between">
                <Navbar changeMode={changeMode} darkMode={darkMode} />
                <motion.div
                    animate={{ y: 0, scale: 1 }}
                    transition={{ type: "spring" }}
                    initial={{ y: 50, scale: 0.8 }}
                    viewport={{ once: true }}
                    className="py-6 container mx-auto px-4 sm:px-0 sm:w-9/12"
                >
                    {children}
                </motion.div>
                <Footer />
            </main>
        </>
    )
}

export default Layout
