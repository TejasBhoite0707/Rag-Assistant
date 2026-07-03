const Card = ({ children, className = "" }) => {

    return (
        <div
            className={`rounded-xl bg-white shadow-md p-6 ${className}`}
        >
            {children}
        </div>
    );

};

export default Card;