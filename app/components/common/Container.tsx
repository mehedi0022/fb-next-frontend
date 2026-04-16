import { ReactNode } from "react"

const Container = ({ children , className}: {children: ReactNode, className?: string}) => {

    return (
        <section className={`max-w-6xl mx-auto px-5 ${className}`}>
            {children}
        </section>
    )
}

export default Container