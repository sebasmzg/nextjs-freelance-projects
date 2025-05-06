interface TitleProps {
    children: React.ReactNode 
}

export const Title = ({children}:TitleProps)=> {
    const baseClasses = "mt-3 text-center text-3xl font-extrabold text-gray-900"
    return <h2 
        className={baseClasses}
    >
        {children}
    </h2>
}