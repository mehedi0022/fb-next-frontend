import { ReactNode } from "react"

const Container = ({ children , className}: {children: ReactNode, className?: string}) => {

    return (
        <section className={`max-w-7xl mx-auto ${className}`}>
            {children}
        </section>
    )
}

export default Container