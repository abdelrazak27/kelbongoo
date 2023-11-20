function Button({ text, functionButton, disabled }) {
    return (
        <button onClick={functionButton} disabled={disabled}>{text}</button>
    )
}

export default Button