import { ContainerProps } from "@/lib/home"

const Container = ({ children , className}: ContainerProps) => {

    return (
        <section className={`max-w-6xl mx-auto px-5 ${className}`}>
            {children}
        </section>
    )
}

export default Container